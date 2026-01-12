<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>

<template>
    <footer
        class="mt-8 md:mt-16 text-center text-xs text-gray-400/80 font-medium mix-blend-multiply animate-fade-in"
        style="animation-delay: 0.5s;">
        <p>&copy; 2017-{{ currentYear }} zkl2333. All rights reserved.</p>
        <a href="https://beian.miit.gov.cn" target="_blank"
            class="hover:text-gray-600 transition-colors mt-2 inline-block px-3 py-1 rounded-full hover:bg-white/20">
            浙ICP备17004361号-1
        </a>
    </footer>
</template>
