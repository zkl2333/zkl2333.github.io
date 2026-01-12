<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { getFastestGravatar } from '@/utils/gravatar'
import { ref, onMounted } from 'vue'
import { useGreeting } from '@/composables/useGreeting'

const email = 'i@zkl2333.com'
const avatarUrl = ref('')

const { greeting } = useGreeting()

onMounted(() => {
    // 初始头像
    avatarUrl.value = `https://www.gravatar.com/avatar/${email}?s=128&d=identicon`
    // 尝试获取更快的头像镜像
    getFastestGravatar(email, 128, 'identicon').then(url => {
        avatarUrl.value = url
    })
})
</script>

<template>
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
</template>
