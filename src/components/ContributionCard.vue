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
        class="relative p-4 rounded-xl bg-white/40 border border-white/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-500/10 group/card flex flex-col backdrop-blur-sm overflow-hidden hover:bg-white/60">

        <!-- Card Hover Gradient -->
        <div
            class="absolute inset-0 bg-linear-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300">
        </div>

        <!-- Header: Icon + Title + Stars -->
        <div class="relative z-10 flex items-start justify-between gap-3 mb-3">
            <div class="flex items-center gap-2.5 min-w-0">
                 <div class="p-1.5 rounded-lg bg-white/50 group-hover/card:bg-white/80 transition-colors shrink-0">
                    <Icon icon="tabler:brand-github"
                    class="w-5 h-5 text-purple-600/80 group-hover/card:text-purple-600 transition-colors" />
                 </div>
                <a :href="repo.repo_url" target="_blank" class="truncate">
                    <h3 class="font-bold text-base text-gray-800 group-hover/card:text-purple-600 transition-colors truncate leading-tight"
                    :title="repo.repo_full_name">{{ repo.repo_full_name }}</h3>
                </a>
            </div>
             <div
                class="flex items-center gap-1 text-xs font-medium text-gray-500 bg-white/30 px-2 py-1 rounded-md group-hover/card:bg-white/60 transition-all shrink-0">
                <Icon icon="tabler:star-filled" class="w-3 h-3 text-amber-400" />
                {{ formatNumber(repo.stars) }}
            </div>
        </div>

        <p class="relative z-10 text-sm text-gray-600 line-clamp-2 mb-4 leading-relaxed opacity-90">
            {{ repo.description }}</p>

        <!-- PR 列表 - Compact Mode -->
        <div class="relative z-10 space-y-1.5 mb-2 grow">
            <a v-for="pr in repo.prs.slice(0, 3)" :key="pr.html_url" :href="pr.html_url" target="_blank"
                class="block px-2.5 py-1.5 rounded-md bg-white/40 hover:bg-white/70 transition-colors border border-transparent hover:border-white/50 group/pr">
                <div class="flex items-center gap-2">
                    <Icon v-if="pr.state === 'MERGED'" icon="pajamas:git-merge"
                          class="w-3.5 h-3.5 text-purple-500 shrink-0" />
                    <Icon v-else-if="pr.state === 'OPEN'" icon="pajamas:git-pull-request"
                          class="w-3.5 h-3.5 text-green-500 shrink-0" />
                    <Icon v-else icon="pajamas:git-pull-request-closed"
                          class="w-3.5 h-3.5 text-gray-400 shrink-0" />
                    <p class="text-xs text-gray-700 line-clamp-1 flex-1 font-medium group-hover/pr:text-purple-700 transition-colors">{{ pr.title }}</p>
                </div>
            </a>
        </div>

        <!-- 底部信息 -->
        <div class="relative z-10 flex items-center justify-end pt-2 border-t border-gray-100/50 mt-auto">
             <div class="flex items-center gap-1.5 text-xs text-gray-400">
                <Icon icon="tabler:git-pull-request" class="w-3.5 h-3.5" />
                <span>{{ repo.prs.length }} Contributions</span>
            </div>
        </div>
    </div>
</template>
