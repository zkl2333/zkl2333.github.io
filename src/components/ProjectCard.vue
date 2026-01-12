<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { formatNumber } from '@/utils/format'
import { getLangColor } from '@/constants/lang-colors'
import type { Repo } from '@/types/github'

interface Props {
    project: Repo
}

defineProps<Props>()
</script>

<template>
    <a :href="project.html_url" target="_blank"
        class="relative p-4 rounded-xl bg-white/40 border border-white/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/10 group/card flex flex-col h-full backdrop-blur-sm overflow-hidden hover:bg-white/60">
        <!-- Card Hover Gradient -->
        <div
            class="absolute inset-0 bg-linear-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300">
        </div>

        <!-- Header: Icon + Title + Stars -->
        <div class="relative z-10 flex items-start justify-between gap-3 mb-3">
            <div class="flex items-center gap-2.5 min-w-0">
                <div class="p-1.5 rounded-lg bg-white/50 group-hover/card:bg-white/80 transition-colors shrink-0">
                     <Icon icon="tabler:folder"
                    class="w-5 h-5 text-blue-600/80 group-hover/card:text-blue-600 transition-colors" />
                </div>
                <h3 class="font-bold text-base text-gray-800 group-hover/card:text-blue-600 transition-colors truncate leading-tight"
                    :title="project.name">{{ project.name }}</h3>
            </div>
            
             <div
                class="flex items-center gap-1 text-xs font-medium text-gray-500 bg-white/30 px-2 py-1 rounded-md group-hover/card:bg-white/60 transition-all shrink-0">
                <Icon icon="tabler:star-filled" class="w-3 h-3 text-amber-400" />
                {{ formatNumber(project.stargazers_count) }}
            </div>
        </div>

        <!-- Body: Description -->
        <p class="relative z-13 text-sm text-gray-600 line-clamp-2 mb-4 grow leading-relaxed opacity-90">
            {{ project.description }}</p>

        <!-- Footer: Language & Meta -->
        <div class="relative z-10 flex items-center justify-between mt-auto pt-3 border-t border-gray-100/50">
            <div class="flex items-center gap-1.5">
                <span class="w-2 h-2 rounded-full ring-1 ring-white/50"
                    :class="getLangColor(project.language)"></span>
                <span class="text-xs text-gray-500 font-medium">{{ project.language }}</span>
            </div>
            <Icon icon="tabler:arrow-up-right" class="w-4 h-4 text-gray-400 opacity-0 -translate-x-2 group-hover/card:opacity-100 group-hover/card:translate-x-0 transition-all duration-300" />
        </div>
    </a>
</template>
