<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { formatNumber } from '@/utils/format'
import type { ContributionRepo } from '@/types/github'

interface Props {
    repo: ContributionRepo
}

defineProps<Props>()
</script>

<template>
    <div
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
                {{ formatNumber(repo.stars) }}
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
</template>
