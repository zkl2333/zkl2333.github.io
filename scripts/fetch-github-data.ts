import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";

const OWNER = "zkl2333";
const OUT_DIR = path.join(process.cwd(), "public", "data");
const TOP_COUNT = 6;

// 用于存储rate limit信息
let rateLimit: ReturnType<typeof getRateLimitInfo> | undefined;

interface GitHubRepo {
  name: string;
  description: string;
  stargazers_count: number;
  language: string;
  html_url: string;
  archived?: boolean;
}

interface Project {
  name: string;
  description: string;
  stargazers_count: number;
  language: string;
  html_url: string;
}

interface GitHubPullRequest {
  title: string;
  html_url: string;
  created_at: string;
  state: string;
  repository_url: string;
  pull_request?: {
    merged_at: string | null;
  };
}

interface RepoInfo {
  stars: number;
  fullName: string;
  description: string;
}

interface ContributionRepo {
  repo_name: string;
  repo_full_name: string;
  repo_url: string;
  description: string;
  stars: number;
  prs: Array<{
    title: string;
    html_url: string;
    created_at: string;
    state: string;
  }>;
}

interface MetaData {
  generated_at: string;
  source: string;
  rate_limit?: {
    remaining: number;
    reset: number;
  };
}

/**
 * 封装GitHub API请求，自动处理认证和错误
 */
async function ghRequest<T>(url: string): Promise<{ data: T; headers: Headers }> {
  const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;

  const res = await fetch(url, {
    headers: {
      Accept: "application/vnd.github+json",
      "User-Agent": `${OWNER}-homepage-bot`,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`${res.status} ${res.statusText}: ${errorText}`);
  }

  return { data: (await res.json()) as T, headers: res.headers };
}

/**
 * 获取rate limit信息
 */
function getRateLimitInfo(headers: Headers) {
  const remaining = headers.get("x-ratelimit-remaining");
  const reset = headers.get("x-ratelimit-reset");
  return {
    remaining: remaining ? parseInt(remaining, 10) : 0,
    reset: reset ? parseInt(reset, 10) : 0,
  };
}

/**
 * 获取GitHub项目列表
 */
async function fetchProjects(): Promise<Project[]> {
  console.log(`Fetching repos for ${OWNER}...`);

  const { data: repos, headers } = await ghRequest<GitHubRepo[]>(
    `https://api.github.com/users/${OWNER}/repos?sort=pushed&direction=desc&per_page=100`
  );

  const projects = repos
    .filter((repo) => !repo.archived)
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, TOP_COUNT)
    .map((repo) => ({
      name: repo.name,
      description: repo.description || "No description provided.",
      stargazers_count: repo.stargazers_count,
      language: repo.language || "Code",
      html_url: repo.html_url,
    }));

  console.log(`Fetched ${projects.length} projects`);

  // 更新rate limit信息
  if (!rateLimit) {
    rateLimit = getRateLimitInfo(headers);
  }

  return projects;
}

/**
 * 获取GitHub贡献数据
 */
async function fetchContributions(): Promise<ContributionRepo[]> {
  console.log(`Fetching contributions for ${OWNER}...`);

  // 获取PR列表
  const { data: searchResult, headers: searchHeaders } = await ghRequest<{ items: GitHubPullRequest[] }>(
    `https://api.github.com/search/issues?q=author:${OWNER}+type:pr+-user:${OWNER}&sort=created&order=desc&per_page=50`
  );

  // 更新rate limit信息（search API有独立的rate limit）
  if (!rateLimit) {
    rateLimit = getRateLimitInfo(searchHeaders);
  }

  const items = searchResult.items || [];

  // 按仓库分组
  const repoMap = new Map<string, GitHubPullRequest[]>();
  items.forEach((item) => {
    const repoUrl = item.repository_url;
    if (!repoMap.has(repoUrl)) {
      repoMap.set(repoUrl, []);
    }
    repoMap.get(repoUrl)!.push(item);
  });

  console.log(`Found PRs from ${repoMap.size} repositories`);

  // 批量获取仓库信息（只获取需要展示的仓库）
  const repoPromises = Array.from(repoMap.keys()).map(async (repoUrl) => {
    try {
      const { data: repoData } = await ghRequest<any>(repoUrl);
      return {
        repoUrl,
        stars: repoData.stargazers_count,
        fullName: repoData.full_name,
        description: repoData.description || "No description provided.",
      };
    } catch (e) {
      console.error(`Failed to fetch repo ${repoUrl}:`, e);
      return { repoUrl, stars: 0, fullName: "", description: "" };
    }
  });

  const repoInfos = await Promise.all(repoPromises);
  const repoStarsMap = new Map(repoInfos.map((r) => [r.repoUrl, r]));

  // 组合数据
  const contributionList: ContributionRepo[] = Array.from(repoMap.entries()).map(([repoUrl, prs]) => {
    const repoInfo = repoStarsMap.get(repoUrl);
    return {
      repo_name: repoUrl.split("/").pop() || "",
      repo_full_name: repoInfo?.fullName || repoUrl.replace("https://api.github.com/repos/", ""),
      repo_url: repoUrl.replace("api.github.com/repos", "github.com"),
      description: repoInfo?.description || "No description provided.",
      stars: repoInfo?.stars || 0,
      prs: prs.map((pr) => ({
        title: pr.title,
        html_url: pr.html_url,
        created_at: pr.created_at,
        state: pr.pull_request?.merged_at ? "MERGED" : pr.state === "open" ? "OPEN" : "CLOSED",
      })),
    };
  });

  // 按仓库star数排序，取前6个
  const sorted = contributionList.sort((a, b) => b.stars - a.stars).slice(0, TOP_COUNT);
  console.log(`Top ${sorted.length} contributions repositories by stars`);
  return sorted;
}

/**
 * 主函数
 */
async function main() {
  try {
    console.log("Starting GitHub data fetch...");
    console.log(`Output directory: ${OUT_DIR}`);

    // 创建输出目录
    await mkdir(OUT_DIR, { recursive: true });

    // 获取rate limit信息（在第一次请求后）
    let rateLimit: MetaData["rate_limit"];

    // 并行获取所有数据
    const [projects, contributions] = await Promise.all([
      fetchProjects(),
      fetchContributions(),
    ]);

    // 保存数据到JSON文件
    const projectsPath = path.join(OUT_DIR, "projects.json");
    const contributionsPath = path.join(OUT_DIR, "contributions.json");
    const metaPath = path.join(OUT_DIR, "meta.json");

    await writeFile(projectsPath, JSON.stringify(projects, null, 2), "utf-8");
    console.log(`✓ Saved projects to ${projectsPath}`);

    await writeFile(contributionsPath, JSON.stringify(contributions, null, 2), "utf-8");
    console.log(`✓ Saved contributions to ${contributionsPath}`);

    // 保存元数据
    const meta: MetaData = {
      generated_at: new Date().toISOString(),
      source: "github-actions",
      ...(rateLimit ? { rate_limit: rateLimit } : {}),
    };
    await writeFile(metaPath, JSON.stringify(meta, null, 2), "utf-8");
    console.log(`✓ Saved meta to ${metaPath}`);

    console.log("\n✅ Data fetch completed successfully!");
    console.log(`   - ${projects.length} projects`);
    console.log(`   - ${contributions.length} contribution repositories`);
  } catch (error) {
    console.error("\n❌ Error during data fetch:", error);
    process.exit(1);
  }
}

// 运行主函数
main();
