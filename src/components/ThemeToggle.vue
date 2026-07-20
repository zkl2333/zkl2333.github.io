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
    class="nav-chip cursor-pointer"
    aria-label="切换主题"
  >
    <!-- Sun Icon -->
    <Icon
      v-if="isDark"
      icon="tabler:sun"
      class="w-5 h-5"
    />
    <!-- Moon Icon -->
    <Icon
      v-else
      icon="tabler:moon"
      class="w-5 h-5"
    />
  </button>
</template>
