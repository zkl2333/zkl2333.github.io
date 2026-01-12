<script setup lang="ts">
import { Icon } from '@iconify/vue'
import type { SocialLink } from '@/types/social'

interface Props {
    links: SocialLink[]
}

defineProps<Props>()
</script>

<template>
    <div class="flex flex-wrap justify-center gap-4 md:gap-6 relative z-10 animate-fade-up"
        style="animation-delay: 0.3s;">
        <a v-for="link in links" :key="link.url" :href="link.url" target="_blank"
            class="relative flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-white/40 border border-white/50 text-gray-500 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-purple-500/20 group/btn backdrop-blur-md overflow-hidden"
            :class="link.color">
            <div
                class="absolute inset-0 bg-linear-to-tr from-white/0 via-white/40 to-white/0 opacity-0 group-hover/btn:opacity-100 transform -translate-x-full group-hover/btn:translate-x-full transition-all duration-700">
            </div>
            <Icon :icon="link.icon"
                class="w-6 h-6 transition-transform group-hover/btn:scale-110 relative z-10" />
        </a>
    </div>
</template>
