<script setup lang="ts">
import { useTheme } from '@/composables/useTheme';
import { Icon } from '@iconify/vue';

const { theme, isDark, setTheme } = useTheme();

const toggleTheme = () => {
  if (theme.value === 'system') {
    setTheme(isDark.value ? 'light' : 'dark');
  } else {
    setTheme(theme.value === 'dark' ? 'light' : 'dark');
  }
};
</script>

<template>
  <button
    @click="toggleTheme"
    class="fixed top-4 right-4 z-50 p-3 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-lg ring-1 ring-white/40 dark:ring-gray-700/40 transition-all duration-300 hover:scale-110 active:scale-95"
    aria-label="切换主题"
  >
    <!-- Sun Icon -->
    <Icon
      v-if="isDark"
      icon="tabler:sun"
      class="w-5 h-5 text-amber-400"
    />
    <!-- Moon Icon -->
    <Icon
      v-else
      icon="tabler:moon"
      class="w-5 h-5 text-indigo-500"
    />
  </button>
</template>
