<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { ref } from 'vue'

interface Props {
    modelValue: boolean
    expandText: string
    collapseText: string
}

const props = defineProps<Props>()
const emit = defineEmits<{
    'update:modelValue': [value: boolean]
}>()

const handleClick = () => {
    emit('update:modelValue', !props.modelValue)
}
</script>

<template>
    <div class="md:hidden mb-6 flex justify-center relative z-10 animate-fade-up" style="animation-delay: 0.2s;">
        <button @click="handleClick"
            class="flex items-center gap-2 px-4 py-2 rounded-full bg-white/40 dark:bg-gray-800/40 border border-white/50 dark:border-gray-700/50 text-gray-600 dark:text-gray-300 text-sm font-medium shadow-sm hover:bg-white/60 dark:hover:bg-gray-700/60 active:scale-95 transition-all backdrop-blur-sm">
            <span v-if="!modelValue">{{ expandText }}</span>
            <span v-else>{{ collapseText }}</span>
            <Icon :icon="modelValue ? 'tabler:chevron-up' : 'tabler:chevron-down'"
                class="w-4 h-4" />
        </button>
    </div>
</template>
