<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>

<template>
    <footer
        class="mt-20 border-t border-[var(--color-border)] py-7 text-[0.8rem] text-[var(--color-muted)] text-center">
        <p>&copy; 2017-{{ currentYear }} zkl2333. All rights reserved.</p>
        <a href="https://beian.miit.gov.cn" target="_blank" rel="noopener noreferrer"
            class="nav-chip mt-1 inline-flex">
            浙ICP备17004361号-1
        </a>
    </footer>
</template>
