<script setup lang="ts">
import { getFastestGravatar } from '@/utils/gravatar'
import { ref, onMounted } from 'vue'
import { useGreeting } from '@/composables/useGreeting'

const email = 'i@zkl2333.com'
const avatarUrl = ref('')

const { greeting } = useGreeting()

onMounted(() => {
    avatarUrl.value = `https://www.gravatar.com/avatar/${email}?s=256&d=identicon`
    getFastestGravatar(email, 256, 'identicon').then(url => {
        avatarUrl.value = url
    })
})
</script>

<template>
    <div class="flex flex-col md:flex-row items-center gap-10 md:gap-16 mb-12 md:mb-16 relative z-10 animate-fade-up"
        style="animation-delay: 0.1s;">

        <!-- Left Column: Avatar (Visual Anchor) -->
        <div class="relative shrink-0 group">
            <!-- Decorative Glow Behind -->
            <div
                class="absolute -inset-4 bg-gradient-to-tr from-cyan-400/20 to-purple-400/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700">
            </div>

            <!-- Avatar Container -->
            <div class="relative w-40 h-40 md:w-52 md:h-52">
                <div
                    class="w-full h-full rounded-full p-1.5 bg-white/30 backdrop-blur-md shadow-2xl ring-1 ring-white/50 transition-transform duration-500 group-hover:scale-[1.02] group-hover:rotate-2">
                    <img :src="avatarUrl" alt="Avatar"
                        class="w-full h-full rounded-full object-cover shadow-inner bg-gray-100">
                </div>

                <!-- Status Badge -->
                <div
                    class="absolute bottom-2 right-2 md:bottom-4 md:right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] md:text-xs font-bold shadow-lg border border-white/60 flex items-center gap-2 text-gray-700 transition-transform duration-300 group-hover:scale-110">
                    <span class="relative flex h-2.5 w-2.5">
                        <span
                            class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                    </span>
                    <span>Online</span>
                </div>
            </div>
        </div>

        <!-- Right Column: Content (Typography) -->
        <div class="flex-1 text-center md:text-left flex flex-col items-center md:items-start">
            
            <!-- 1. Intro / Greeting (Editorial Style) -->
            <div class="mb-2 md:mb-1 relative overflow-hidden">
                <span class="text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-gray-500/90 pl-1">
                    {{ greeting }}
                </span>
            </div>

            <!-- 2. Name (Massive & Tight) -->
            <h1 class="text-6xl md:text-8xl font-black text-gray-900 tracking-tighter leading-[0.9] mb-6 md:mb-8 drop-shadow-sm">
                多吃点
            </h1>

            <!-- 3. Bio & Details (Clean Layout) -->
            <div class="space-y-3 md:space-y-4 max-w-lg">
                <!-- ID & Tagline -->
                <div class="flex flex-wrap items-center justify-center md:justify-start gap-x-3 gap-y-1 text-base md:text-xl font-medium text-gray-800">
                    <span class="font-mono text-cyan-600/90">@zkl2333</span>
                    <span class="hidden md:inline w-1.5 h-1.5 rounded-full bg-gray-300"></span>
                    <span>一个热爱生活的可爱男孩</span>
                </div>

                <!-- Description -->
                <p class="text-sm md:text-base text-gray-500 leading-relaxed font-medium">
                    写写前端、折腾点代码，也会做些小工具玩玩
                    <br class="hidden md:block" />
                    <span class="inline-flex items-center gap-1.5 mt-1 md:mt-1.5 opacity-80">
                        <span>奶茶咖啡轮着喝 ☕</span>
                        <span class="w-1 h-1 rounded-full bg-gray-400"></span>
                        <span>馋了就点炸鸡火锅 🍗</span>
                    </span>
                </p>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* Optional: Add a very subtle text gradient if needed, but solid usually looks cleaner for this style */
</style>