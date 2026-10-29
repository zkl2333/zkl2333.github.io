# agent.md — zkl2333.github.io 个人主页

## 项目概况

Vue 3 + TypeScript + Vite + Tailwind CSS 4 的个人主页，部署在 GitHub Pages（www.zkl2333.com）。
视觉主题为博客同款「小饭桌」：奶油米白底 + 焦糖橙 accent，支持亮/暗主题切换。

- 入口：`src/views/home.vue`（单页，header / hero / GitHub 项目 / 开源贡献 / footer）
- 组件：`src/components/`（ProjectCard、ContributionCard、SocialLinks、ThemeToggle、PageFooter）
- 全局样式：`src/assets/style.css`（主题色变量集中在 `html[data-theme]` 的 oklch 定义里）
- 脚本：`scripts/fetch-github-data.ts`（拉 GitHub 数据）、`scripts/generate-icons.ts`（生成 favicon/PWA 图标/OG 图）

## 常用命令

```bash
npm run dev            # 本地开发（会先跑 generate:icons）
npm run build          # 构建（含 generate:icons）
npm run fetch-data     # 手动刷新 public/data/*.json
```

本地 Node 版本以 package.json 的 volta 配置为准（24.x），CI 已对齐。

## 数据同步机制（重要，勿误判为故障）

- `public/data/*.json` 只是**本地开发的兜底种子数据**，不需要定期同步，过期无影响。
- 线上数据由 `.github/workflows/deploy.yml` 的定时任务（每天北京时间凌晨 3 点）在 CI 里重新拉取并覆盖，构建产物里的永远是最新数据。
- workflow 依赖 dependabot 等提交保持仓库活跃；GitHub 会在仓库 **60 天无活动后自动停用定时任务**，若发现线上数据停更，去 Actions 页面手动 re-enable 即可。
- `secrets.GITHUB_TOKEN` 用的是 Actions 内置 token，无需额外配置。

## 部署链路

push 到 master 或定时触发 → fetch-data + generate:icons → vite build → 复制 404.html 修 SPA 路由 → peaceiris/actions-gh-pages 发布到 `gh-pages` 分支。

## 已知技术决策

- **图标**：统一用 `@iconify/vue` 运行时加载 tabler 图标（依赖 api.iconify.design）。曾配置过 unplugin-icons 构建期打包方案，因无引用已于 2026-10 移除；如要对国内访客更稳，可重新引入并把约 10 个图标改为 `~icons/tabler/*` 静态导入（需小改 SocialLinks 的动态图标字符串）。
- **头像**：`src/utils/gravatar.ts` 用 crypto-js 算 MD5，竞速请求多个 Gravatar 镜像取最快。
- **字体**：CSS 里引用了 LXGW WenKai Screen，但未引入 webfont 文件，实际走系统字体回退。

## 相关仓库

- `zkl2333/zkl2333`：GitHub 个人资料 README。注意**不要**对统计卡片用 `align="right"` 浮动布局——多张卡片并排会挤压正文宽度，中文会被挤成竖排。当前方案是文字在上、卡片统一高度并排居中在下。
