<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { getGravatarUrl, getFastestGravatar } from '@/utils/gravatar'
import { ref, onMounted, onUnmounted, reactive, computed } from 'vue'

const email = 'i@zkl2333.com'
const avatarUrl = ref(getGravatarUrl(email, 128, 'identicon'))

interface SocialLink {
    url: string
    icon: string
    label: string
    color: string
}

const socialLinks: SocialLink[] = [
    {
        url: 'https://github.com/zkl2333',
        icon: 'tabler:brand-github',
        label: 'GitHub',
        color: 'hover:text-gray-900 group-hover/btn:bg-white/90',
    },
    {
        url: 'https://blog.zkl2333.com',
        icon: 'tabler:notebook',
        label: 'Blog',
        color: 'hover:text-blue-600 group-hover/btn:bg-blue-50',
    },
    {
        url: 'https://twitter.com/zkl2333',
        icon: 'tabler:brand-x',
        label: 'Twitter',
        color: 'hover:text-sky-500 group-hover/btn:bg-sky-50',
    },
    {
        url: 'mailto:i@zkl2333.com',
        icon: 'tabler:mail',
        label: 'Email',
        color: 'hover:text-red-500 group-hover/btn:bg-red-50',
    },
]

// GitHub Data
interface Repo {
    name: string
    description: string
    stargazers_count: number
    language: string
    html_url: string
}

interface PullRequest {
    title: string
    html_url: string
    created_at: string
    state: string
}

interface ContributionRepo {
    repo_name: string
    repo_full_name: string
    repo_url: string
    description: string
    stars: number
    prs: PullRequest[]
}

const projects = ref<Repo[]>([])
const contributions = ref<ContributionRepo[]>([])
const loading = ref(true)
const error = ref(false)
const isProjectsExpanded = ref(false)
const isContributionsExpanded = ref(false)

const fetchProjects = async () => {
    try {
        const res = await fetch('https://api.github.com/users/zkl2333/repos?sort=pushed&direction=desc')
        if (!res.ok) throw new Error('Failed to fetch')
        const data: any[] = await res.json()

        console.log('Fetched projects:', data.length)

        // Filter out forks & archived repos, then sort by stars
        projects.value = data
            .filter(repo => !repo.archived)
            .sort((a, b) => b.stargazers_count - a.stargazers_count) // Sort by stars for "coolness"
            .slice(0, 6) // Top 6
            .map(repo => ({
                name: repo.name,
                description: repo.description || 'No description provided.',
                stargazers_count: repo.stargazers_count,
                language: repo.language || 'Code',
                html_url: repo.html_url
            }))
    } catch (e) {
        console.error('GitHub API fetch failed', e)
        error.value = true
    }
}

const fetchContributions = async () => {
    try {
        // 获取 PR 列表
        const res = await fetch('https://api.github.com/search/issues?q=author:zkl2333+type:pr+-user:zkl2333&sort=created&order=desc&per_page=50')

        if (!res.ok) throw new Error('Failed to fetch')

        const data = await res.json()

        // 按仓库分组
        const repoMap = new Map<string, { prs: any[], repoUrl: string }>()
        ;(data.items || []).forEach((item: any) => {
            const repoUrl = item.repository_url
            if (!repoMap.has(repoUrl)) {
                repoMap.set(repoUrl, { prs: [], repoUrl })
            }
            repoMap.get(repoUrl)!.prs.push(item)
        })

        // 批量获取仓库信息
        const repoPromises = Array.from(repoMap.keys()).map(async (repoUrl) => {
            try {
                const res = await fetch(repoUrl)
                if (res.ok) {
                    const repoData = await res.json()
                    return { 
                        repoUrl, 
                        stars: repoData.stargazers_count, 
                        fullName: repoData.full_name,
                        description: repoData.description || 'No description provided.'
                    }
                }
            } catch (e) {
                console.error(`Failed to fetch repo ${repoUrl}`, e)
            }
            return { repoUrl, stars: 0, fullName: '', description: '' }
        })

        const repoInfos = await Promise.all(repoPromises)
        const repoStarsMap = new Map(repoInfos.map(r => [r.repoUrl, r]))

        // 组合数据
        const contributionList: ContributionRepo[] = Array.from(repoMap.entries()).map(([repoUrl, { prs }]) => {
            const repoInfo = repoStarsMap.get(repoUrl)
            return {
                repo_name: repoUrl.split('/').pop() || '',
                repo_full_name: repoInfo?.fullName || repoUrl.replace('https://api.github.com/repos/', ''),
                repo_url: repoUrl.replace('api.github.com/repos', 'github.com'),
                description: repoInfo?.description || 'No description provided.',
                stars: repoInfo?.stars || 0,
                prs: prs.map((pr: any) => ({
                    title: pr.title,
                    html_url: pr.html_url,
                    created_at: pr.created_at,
                    state: pr.pull_request?.merged_at ? 'MERGED' : pr.state === 'open' ? 'OPEN' : 'CLOSED'
                }))
            }
        })

        // 按仓库 star 数排序，取前 6 个仓库
        contributions.value = contributionList.sort((a, b) => b.stars - a.stars).slice(0, 6)
    } catch (e) {
        console.error('GitHub contributions fetch failed', e)
    }
}

const currentYear = new Date().getFullYear()

// Greeting based on time
const greeting = computed(() => {
    const hour = new Date().getHours()

    if (hour < 5) return '这么晚还没休息呀？早点睡，照顾好自己 🌙'
    if (hour < 9) return '早安呀，新的一天也请多多关照 ☀️'
    if (hour < 12) return '上午好，愿今天的事情都顺顺利利 ✨'
    if (hour < 14) return '中午好，记得吃点喜欢的东西补补能量 🍱'
    if (hour < 17) return '下午好，来杯饮料提提神也不错 ☕'
    if (hour < 19) return '傍晚好，辛苦啦，放松一下吧 🌆'
    return '晚上好，忙了一天，也别忘了对自己温柔一点 🌃'
})

// Mesh Gradient Animation State - More vibrant for liquid effect
const blobs = reactive([
    { x: 30, y: 30, color: 'bg-purple-400', size: 'w-[40rem] h-[40rem]' },
    { x: 70, y: 30, color: 'bg-indigo-400', size: 'w-[30rem] h-[30rem]' },
    { x: 50, y: 70, color: 'bg-cyan-400', size: 'w-[40rem] h-[40rem]' },
    { x: 20, y: 60, color: 'bg-fuchsia-400', size: 'w-80 h-80' },
])

// Mouse Spotlight State
const spotlight = reactive({ x: 0, y: 0, opacity: 0 })
const cardRef = ref<HTMLElement | null>(null)

const handleMouseMove = (e: MouseEvent) => {
    if (!cardRef.value) return

    const card = cardRef.value
    const rect = card.getBoundingClientRect()

    spotlight.x = e.clientX - rect.left
    spotlight.y = e.clientY - rect.top
    spotlight.opacity = 1
}

const handleMouseLeave = () => {
    spotlight.opacity = 0
}

onMounted(() => {
    // 并行加载所有数据
    Promise.all([fetchProjects(), fetchContributions()])
        .then(() => {
            loading.value = false
        })
        .catch((e) => {
            console.error('Data fetch error:', e)
            error.value = true
            loading.value = false
        })

    window.addEventListener('mousemove', handleMouseMove)

    // 尝试获取更快的头像镜像
    getFastestGravatar(email, 128, 'identicon').then(url => {
        avatarUrl.value = url
    })
})

onUnmounted(() => {
    window.removeEventListener('mousemove', handleMouseMove)
})

const getLangColor = (lang: string) => {
    const colors: Record<string, string> = {
        'Vue': 'bg-green-400',
        'TypeScript': 'bg-blue-400',
        'JavaScript': 'bg-yellow-400',
        'HTML': 'bg-orange-400',
        'CSS': 'bg-indigo-400',
        'Python': 'bg-blue-500',
        'Java': 'bg-red-400',
        'PHP': 'bg-purple-400',
        'Ruby': 'bg-pink-400',
        'Go': 'bg-green-400',
        'C#': 'bg-blue-400',
        'C++': 'bg-red-400',
        'C': 'bg-gray-400',
        'SQL': 'bg-indigo-400',
        'NoSQL': 'bg-orange-400',
        'Docker': 'bg-purple-400',
        'Rust': 'bg-orange-400',
        'Swift': 'bg-purple-400',
        'Kotlin': 'bg-red-400',
        'Scala': 'bg-blue-400',
        'Haskell': 'bg-green-400',
        'Erlang': 'bg-yellow-400',
        'Elixir': 'bg-indigo-400',
        'Crystal': 'bg-orange-400',
        'Shell': 'bg-gray-400',
        'PowerShell': 'bg-blue-400',
        'Batch': 'bg-gray-400',
        'Makefile': 'bg-gray-400',
        'CMake': 'bg-purple-400',
        'Bash': 'bg-green-400',
    }
    return colors[lang] || 'bg-gray-400'
}
</script>

<template>
    <div class="min-h-screen bg-[#F0F2F5] text-gray-800 overflow-hidden relative font-sans selection:bg-cyan-500/20">

        <!-- Liquid Mesh Background -->
        <div class="fixed inset-0 z-0 overflow-hidden pointer-events-none">
            <!-- Glass Overlay for Noise/Texture -->
            <div class="absolute inset-0 z-20 opacity-40 mix-blend-overlay pointer-events-none"
                style="background-image: url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E');">
            </div>

            <div class="absolute inset-0 bg-[#F0F2F5]/80 backdrop-blur-[80px] z-10"></div>
            <!-- Animated Blobs -->
            <div v-for="(blob, i) in blobs" :key="i"
                class="absolute rounded-full mix-blend-multiply filter blur-[100px] opacity-70 animate-float-liquid"
                :class="[blob.color, blob.size]" :style="{
                    left: blob.x + '%',
                    top: blob.y + '%',
                    transform: 'translate(-50%, -50%)',
                    animationDelay: i * 3 + 's'
                }">
            </div>
        </div>

        <div class="relative z-20 flex flex-col items-center justify-center min-h-screen p-4">

            <!-- Liquid Glass Card -->
            <div ref="cardRef"
                class="liquid-card group relative p-6 md:p-12 rounded-4xl md:rounded-[2.5rem] max-w-5xl w-full transition-all duration-500 overflow-hidden mx-4 md:mx-0"
                @mouseleave="handleMouseLeave">

                <!-- Dynamic Spotlight -->
                <div class="pointer-events-none absolute -inset-px opacity-0 transition duration-300" :style="{
                    opacity: spotlight.opacity,
                    background: `radial-gradient(600px circle at ${spotlight.x}px ${spotlight.y}px, rgba(255,255,255,0.4), transparent 40%)`
                }">
                </div>

                <!-- Inner Reflection/Highlight -->
                <div
                    class="absolute inset-0 rounded-[2.5rem] border border-white/40 shadow-[inset_0_0_20px_rgba(255,255,255,0.5)] pointer-events-none">
                </div>

                <!-- Profile Header -->
                <div class="flex flex-col md:flex-row items-center gap-6 md:gap-10 mb-8 md:mb-12 relative z-10 animate-fade-up"
                    style="animation-delay: 0.1s;">

                    <!-- Left Column: Avatar & Greeting -->
                    <div class="flex flex-col items-center shrink-0">
                        <!-- Avatar with subtle ring -->
                        <div class="relative group/avatar">
                            <div
                                class="w-28 h-28 md:w-40 md:h-40 rounded-full p-1.5 bg-white/30 backdrop-blur-md shadow-xl ring-1 ring-white/50 transition-transform duration-500 group-hover/avatar:scale-105">
                                <img :src="avatarUrl" alt="Avatar"
                                    class="w-full h-full rounded-full object-cover shadow-inner">
                            </div>
                            <div
                                class="absolute -bottom-2 -right-2 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-medium shadow-lg border border-white flex items-center gap-1.5 text-gray-600 group-hover/avatar:scale-110 transition-transform duration-300">
                                <span class="relative flex h-2 w-2">
                                    <span
                                        class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                    <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                </span>
                                Online
                            </div>
                        </div>

                        <!-- Greeting Bubble (Flow Layout) -->
                        <div
                            class="relative mt-6 px-4 py-2 rounded-xl bg-white/80 border border-white/50 text-slate-700 text-xs font-medium tracking-wide shadow-sm backdrop-blur-md cursor-default text-center transform transition-transform hover:scale-105 whitespace-nowrap">
                            <div
                                class="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white/80 border-t border-l border-white/50 transform rotate-45">
                            </div>
                            {{ greeting }}
                        </div>
                    </div>

                    <!-- Intro Text -->
                    <div class="text-center md:text-left space-y-2">
                        <h1
                            class="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-linear-to-br from-gray-900 to-gray-600 tracking-tight pb-1 md:pb-2 hover:bg-linear-to-r hover:from-blue-600 hover:to-purple-600 transition-all duration-500 cursor-default">
                            多吃点
                        </h1>
                        <p class="text-base md:text-lg text-gray-600 font-medium">
                            @zkl2333 <span class="text-sm opacity-60 block md:inline mt-0.5 md:mt-0">·
                                一个热爱生活的可爱男孩</span>
                        </p>
                        <p class="text-sm text-gray-500 max-w-md leading-normal">
                            写写前端、折腾点代码，也会做些小工具玩玩
                            <br class="hidden md:block"> 奶茶咖啡轮着喝☕，馋了就点炸鸡火锅牛排烧烤 🍗🥩
                        </p>
                    </div>
                </div>

                <!-- Mobile Toggle Projects Button -->
                <div class="md:hidden mb-8 flex justify-center relative z-10 animate-fade-up"
                    style="animation-delay: 0.15s;">
                    <button @click="isProjectsExpanded = !isProjectsExpanded"
                        class="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/40 border border-white/50 text-gray-600 text-sm font-medium shadow-sm hover:bg-white/60 active:scale-95 transition-all backdrop-blur-sm">
                        <span v-if="!isProjectsExpanded">查看我的项目</span>
                        <span v-else>收起项目列表</span>
                        <Icon :icon="isProjectsExpanded ? 'tabler:chevron-up' : 'tabler:chevron-down'"
                            class="w-4 h-4" />
                    </button>
                </div>

                <!-- GitHub Projects Grid -->
                <div class="mb-8 md:mb-12 relative z-10 animate-fade-up transition-all duration-500 ease-in-out"
                    :class="[isProjectsExpanded ? 'opacity-100 max-h-[2000px]' : 'max-h-0 opacity-0 overflow-hidden md:max-h-none md:opacity-100 md:overflow-visible']"
                    style="animation-delay: 0.2s;">
                    <div v-if="loading" class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div v-for="i in 6" :key="i" class="h-32 rounded-2xl bg-white/20 animate-pulse"></div>
                    </div>
                    <div v-else-if="error" class="flex flex-col items-center justify-center py-8 text-gray-500 gap-2">
                        <Icon icon="tabler:mood-sad" class="w-8 h-8 opacity-60" />
                        <p class="text-sm">暂时无法获取项目列表</p>
                    </div>
                    <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <a v-for="project in projects" :key="project.name" :href="project.html_url" target="_blank"
                            class="relative p-6 rounded-2xl bg-white/40 border border-white/40 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/10 group/card flex flex-col h-full backdrop-blur-sm overflow-hidden">
                            <!-- Card Hover Gradient -->
                            <div
                                class="absolute inset-0 bg-linear-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300">
                            </div>

                            <div class="relative z-10 flex items-center justify-between mb-3">
                                <Icon icon="tabler:folder"
                                    class="w-5 h-5 text-blue-500/80 group-hover/card:text-blue-600 transition-colors transform group-hover/card:scale-110 duration-300" />
                                <div
                                    class="flex items-center gap-1 text-xs font-medium text-gray-500 bg-white/30 px-2 py-0.5 rounded-full group-hover/card:bg-white/50 transition-colors">
                                    <Icon icon="tabler:star" class="w-3 h-3 text-amber-400 fill-amber-400" />
                                    {{ project.stargazers_count }}
                                </div>
                            </div>
                            <h3 class="relative z-10 font-bold text-gray-800 mb-2 group-hover/card:text-blue-600 transition-colors truncate"
                                :title="project.name">{{ project.name }}</h3>
                            <p class="relative z-10 text-xs text-gray-500 line-clamp-2 mb-4 grow leading-relaxed">
                                {{ project.description }}</p>
                            <div class="relative z-10 flex items-center gap-2 mt-auto">
                                <span class="w-2 h-2 rounded-full ring-2 ring-white/50"
                                    :class="getLangColor(project.language)"></span>
                                <span class="text-[10px] text-gray-400 font-semibold tracking-wider">{{
                                    project.language }}</span>
                            </div>
                        </a>
                    </div>
                </div>

                <!-- Divider -->
                <div class="relative z-10 my-8 animate-fade-up" style="animation-delay: 0.22s;">
                    <div class="flex items-center gap-4">
                        <div class="flex-1 h-px bg-linear-to-r from-transparent via-gray-300/50 to-transparent"></div>
                        <div class="px-4 py-1.5 rounded-full bg-white/30 border border-white/40 text-xs font-medium text-gray-500 backdrop-blur-sm">
                            开源贡献
                        </div>
                        <div class="flex-1 h-px bg-linear-to-r from-transparent via-gray-300/50 to-transparent"></div>
                    </div>
                </div>

                <!-- Open Source Contributions -->
                <div class="mb-8 md:mb-12 relative z-10 animate-fade-up transition-all duration-500 ease-in-out"
                    :class="[isContributionsExpanded ? 'opacity-100 max-h-[5000px]' : 'max-h-0 opacity-0 overflow-hidden md:max-h-none md:opacity-100 md:overflow-visible']"
                    style="animation-delay: 0.25s;">
                    <div v-if="contributions.length > 0" class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div v-for="repo in contributions" :key="repo.repo_url"
                            class="relative p-6 rounded-2xl bg-white/40 border border-white/40 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/10 group/card flex flex-col backdrop-blur-sm overflow-hidden">
                            
                            <!-- Card Hover Gradient -->
                            <div
                                class="absolute inset-0 bg-linear-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300">
                            </div>

                            <!-- 仓库头部 -->
                            <div class="relative z-10 flex items-center justify-between mb-3">
                                <Icon icon="tabler:brand-github"
                                    class="w-5 h-5 text-purple-500/80 group-hover/card:text-purple-600 transition-colors transform group-hover/card:scale-110 duration-300" />
                                <div
                                    class="flex items-center gap-1 text-xs font-medium text-gray-500 bg-white/30 px-2 py-0.5 rounded-full group-hover/card:bg-white/50 transition-colors">
                                    <Icon icon="tabler:star" class="w-3 h-3 text-amber-400 fill-amber-400" />
                                    {{ repo.stars }}
                                </div>
                            </div>
                            
                            <a :href="repo.repo_url" target="_blank">
                                <h3 class="relative z-10 font-bold text-gray-800 mb-2 group-hover/card:text-purple-600 transition-colors truncate"
                                    :title="repo.repo_full_name">{{ repo.repo_full_name }}</h3>
                            </a>
                            
                            <p class="relative z-10 text-xs text-gray-500 line-clamp-2 mb-4 leading-relaxed">
                                {{ repo.description }}</p>

                            <!-- PR 列表 -->
                            <div class="relative z-10 space-y-2 mb-4">
                                <a v-for="pr in repo.prs.slice(0, 2)" :key="pr.html_url" :href="pr.html_url" target="_blank"
                                    class="block p-2 rounded-lg hover:bg-white/40 transition-colors">
                                    <div class="flex items-start gap-2">
                                        <Icon v-if="pr.state === 'MERGED'" icon="pajamas:git-merge"
                                              class="w-4 h-4 text-purple-500 shrink-0 mt-0.5" />
                                        <Icon v-else-if="pr.state === 'OPEN'" icon="pajamas:git-pull-request"
                                              class="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                                        <Icon v-else icon="pajamas:git-pull-request-closed"
                                              class="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                                        <p class="text-xs text-gray-700 line-clamp-1 leading-relaxed flex-1">{{ pr.title }}</p>
                                    </div>
                                </a>
                            </div>

                            <!-- 底部信息 -->
                            <div class="relative z-10 flex items-center gap-2 mt-auto">
                                <Icon icon="tabler:git-pull-request" class="w-3 h-3 text-gray-400" />
                                <span class="text-[10px] text-gray-400 font-semibold tracking-wider">{{ repo.prs.length }} 个 PR</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Mobile Toggle Contributions Button -->
                <div class="md:hidden mb-6 flex justify-center relative z-10 animate-fade-up"
                    style="animation-delay: 0.2s;">
                    <button @click="isContributionsExpanded = !isContributionsExpanded"
                        class="flex items-center gap-2 px-4 py-2 rounded-full bg-white/40 border border-white/50 text-gray-600 text-sm font-medium shadow-sm hover:bg-white/60 active:scale-95 transition-all backdrop-blur-sm">
                        <span v-if="!isContributionsExpanded">查看开源贡献</span>
                        <span v-else>收起贡献列表</span>
                        <Icon :icon="isContributionsExpanded ? 'tabler:chevron-up' : 'tabler:chevron-down'"
                            class="w-4 h-4" />
                    </button>
                </div>

                <!-- Social Links -->
                <div class="flex flex-wrap justify-center gap-4 md:gap-6 relative z-10 animate-fade-up"
                    style="animation-delay: 0.3s;">
                    <a v-for="link in socialLinks" :key="link.url" :href="link.url" target="_blank"
                        class="relative flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-white/40 border border-white/50 text-gray-500 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-purple-500/20 group/btn backdrop-blur-md overflow-hidden"
                        :class="link.color">
                        <div
                            class="absolute inset-0 bg-linear-to-tr from-white/0 via-white/40 to-white/0 opacity-0 group-hover/btn:opacity-100 transform -translate-x-full group-hover/btn:translate-x-full transition-all duration-700">
                        </div>
                        <Icon :icon="link.icon"
                            class="w-6 h-6 transition-transform group-hover/btn:scale-110 relative z-10" />
                    </a>
                </div>
            </div>

            <!-- Minimal Footer -->
            <footer
                class="mt-8 md:mt-16 text-center text-xs text-gray-400/80 font-medium mix-blend-multiply animate-fade-in"
                style="animation-delay: 0.5s;">
                <p>&copy; 2017-{{ currentYear }} zkl2333. All rights reserved.</p>
                <a href="https://beian.miit.gov.cn" target="_blank"
                    class="hover:text-gray-600 transition-colors mt-2 inline-block px-3 py-1 rounded-full hover:bg-white/20">
                    浙ICP备17004361号-1
                </a>
            </footer>
        </div>
    </div>
</template>

<style scoped>
.liquid-card {
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0));
    backdrop-filter: blur(40px);
    -webkit-backdrop-filter: blur(40px);
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.05);
}

@keyframes float-liquid {

    0%,
    100% {
        transform: translate(-50%, -50%) scale(1) rotate(0deg);
    }

    33% {
        transform: translate(-40%, -60%) scale(1.1) rotate(10deg);
    }

    66% {
        transform: translate(-60%, -40%) scale(0.9) rotate(-10deg);
    }
}

.animate-float-liquid {
    animation: float-liquid 20s ease-in-out infinite;
}

/* Entrance Animations */
.animate-fade-up {
    animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) backwards;
}

.animate-fade-in {
    animation: fadeIn 1s ease-out backwards;
}

@keyframes fadeUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}
</style>
