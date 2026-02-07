<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>

<template>
    <footer
        class="mt-8 md:mt-16 text-center text-xs text-gray-400/80 dark:text-gray-500/80 font-medium mix-blend-multiply animate-fade-in"
        style="animation-delay: 0.5s;">
        <p>&copy; 2017-{{ currentYear }} zkl2333. All rights reserved.</p>
        <a href="https://beian.miit.gov.cn" target="_blank"
            class="hover:text-gray-600 dark:hover:text-gray-300 transition-colors mt-2 inline-block px-3 py-1 rounded-full hover:bg-white/20 dark:hover:bg-gray-800/40">
            浙ICP备17004361号-1
        </a>
    </footer>
</template>
