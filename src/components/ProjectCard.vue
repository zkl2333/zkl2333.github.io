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
        class="relative p-5 rounded-2xl bg-white/40 border border-white/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/15 group/card flex flex-col h-full backdrop-blur-sm overflow-hidden">
        <!-- Card Hover Gradient -->
        <div
            class="absolute inset-0 bg-linear-to-br from-blue-500/8 to-purple-500/8 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300">
        </div>

        <!-- Header: Icon + Title + Stars -->
        <div class="relative z-10 flex items-start justify-between gap-4 mb-4">
            <div class="flex items-center gap-3 min-w-0">
                <div class="p-2 rounded-xl bg-white/50 group-hover/card:bg-white/80 transition-colors shrink-0 shadow-sm">
                    <Icon icon="tabler:folder"
                        class="w-6 h-6 text-blue-600/90 group-hover/card:text-blue-600 transition-colors" />
                </div>
                <h3 class="font-bold text-lg text-gray-900 group-hover/card:text-blue-600 transition-colors truncate leading-snug"
                    :title="project.name">{{ project.name }}</h3>
            </div>

            <div
                class="flex items-center gap-1.5 text-xs font-semibold text-gray-600 bg-white/30 px-2.5 py-1.5 rounded-lg group-hover/card:bg-white/60 transition-all shrink-0 shadow-sm">
                <Icon icon="tabler:star-filled" class="w-3.5 h-3.5 text-amber-400" />
                {{ formatNumber(project.stargazers_count) }}
            </div>
        </div>

        <!-- Body: Description -->
        <p class="relative z-10 text-sm text-gray-600 line-clamp-2 mb-4 grow leading-snug">
            {{ project.description }}</p>

        <!-- Footer: Language & Arrow -->
        <div class="relative z-10 flex items-center justify-between mt-auto pt-4 border-t border-gray-200/60">
            <div class="flex items-center gap-2">
                <span class="w-2.5 h-2.5 rounded-full ring-2 ring-white/50 shadow-sm"
                    :class="getLangColor(project.language)"></span>
                <span class="text-xs text-gray-600 font-medium">{{ project.language }}</span>
            </div>
            <Icon icon="tabler:arrow-up-right" class="w-5 h-5 text-gray-400 opacity-0 -translate-x-2 group-hover/card:opacity-100 group-hover/card:translate-x-0 transition-all duration-300" />
        </div>
    </a>
</template>
