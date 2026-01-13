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
        class="relative p-5 rounded-2xl bg-white/40 border border-white/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-500/15 group/card flex flex-col backdrop-blur-sm overflow-hidden">

        <!-- Card Hover Gradient -->
        <div
            class="absolute inset-0 bg-linear-to-br from-purple-500/8 to-pink-500/8 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300">
        </div>

        <!-- Header: Icon + Title + Stars -->
        <div class="relative z-10 flex items-start justify-between gap-4 mb-4">
            <div class="flex items-center gap-3 min-w-0">
                <div class="p-2 rounded-xl bg-white/50 group-hover/card:bg-white/80 transition-colors shrink-0 shadow-sm">
                    <Icon icon="tabler:brand-github"
                        class="w-6 h-6 text-purple-600/90 group-hover/card:text-purple-600 transition-colors" />
                </div>
                <a :href="repo.repo_url" target="_blank" class="truncate">
                    <h3 class="font-bold text-lg text-gray-900 group-hover/card:text-purple-600 transition-colors truncate leading-snug"
                        :title="repo.repo_full_name">{{ repo.repo_full_name }}</h3>
                </a>
            </div>

            <div
                class="flex items-center gap-1.5 text-xs font-semibold text-gray-600 bg-white/30 px-2.5 py-1.5 rounded-lg group-hover/card:bg-white/60 transition-all shrink-0 shadow-sm">
                <Icon icon="tabler:star-filled" class="w-3.5 h-3.5 text-amber-400" />
                {{ formatNumber(repo.stars) }}
            </div>
        </div>

        <!-- Body: Description -->
        <p class="relative z-10 text-sm text-gray-600 line-clamp-2 mb-4 leading-snug">
            {{ repo.description }}</p>

        <!-- PR 列表 - Refined -->
        <div class="relative z-10 space-y-2 mb-4 grow">
            <a v-for="pr in repo.prs.slice(0, 3)" :key="pr.html_url" :href="pr.html_url" target="_blank"
                class="block px-3 py-2 rounded-xl bg-white/40 hover:bg-white/70 transition-colors border border-transparent hover:border-white/50 group/pr">
                <div class="flex items-center gap-2">
                    <Icon v-if="pr.state === 'MERGED'" icon="pajamas:git-merge"
                          class="w-4 h-4 text-purple-500 shrink-0" />
                    <Icon v-else-if="pr.state === 'OPEN'" icon="pajamas:git-pull-request"
                          class="w-4 h-4 text-green-500 shrink-0" />
                    <Icon v-else icon="pajamas:git-pull-request-closed"
                          class="w-4 h-4 text-gray-400 shrink-0" />
                    <p class="text-xs text-gray-700 line-clamp-1 flex-1 font-medium leading-snug group-hover/pr:text-purple-700 transition-colors">{{ pr.title }}</p>
                </div>
            </a>
        </div>

        <!-- Footer: Contributions Count -->
        <div class="relative z-10 flex items-center justify-end pt-4 border-t border-gray-200/60 mt-auto">
            <div class="flex items-center gap-1.5 text-xs text-gray-500 font-medium bg-white/20 px-3 py-1.5 rounded-lg">
                <Icon icon="tabler:git-pull-request" class="w-4 h-4" />
                <span>{{ repo.prs.length }} Contributions</span>
            </div>
        </div>
    </div>
</template>
