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
                {{ formatNumber(project.stargazers_count) }}
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
</template>
