/**
 * GitHub 相关类型定义
 */

export interface Repo {
    name: string
    description: string
    stargazers_count: number
    language: string
    html_url: string
}

export interface PullRequest {
    title: string
    html_url: string
    created_at: string
    state: string
}

export interface ContributionRepo {
    repo_name: string
    repo_full_name: string
    repo_url: string
    description: string
    stars: number
    prs: PullRequest[]
}
