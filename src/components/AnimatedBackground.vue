<script setup lang="ts">
interface Blob {
    x: number
    y: number
    color: string
    size: string
}

interface Props {
    blobs: Blob[]
}

defineProps<Props>()
</script>

<template>
    <div class="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <!-- Glass Overlay for Noise/Texture -->
        <div class="absolute inset-0 z-20 opacity-40 mix-blend-overlay pointer-events-none"
            style="background-image: url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E');">
        </div>

        <div class="absolute inset-0 bg-[#F0F2F5]/80 backdrop-blur-[80px] z-10"></div>
        <!-- Animated Blobs -->
        <div v-for="(blob, i) in blobs" :key="i"
            class="absolute rounded-full mix-blend-multiply filter blur-[100px] opacity-70 animate-float-liquid"
            :class="[blob.color, blob.size]" :style="{
                left: blob.x + '%',
                top: blob.y + '%',
                transform: 'translate(-50%, -50%)',
                animationDelay: i * 3 + 's'
            }">
        </div>
    </div>
</template>

<style scoped>
@keyframes float-liquid {
    0%,
    100% {
        transform: translate(-50%, -50%) scale(1) rotate(0deg);
    }

    33% {
        transform: translate(-40%, -60%) scale(1.1) rotate(10deg);
    }

    66% {
        transform: translate(-60%, -40%) scale(0.9) rotate(-10deg);
    }
}

.animate-float-liquid {
    animation: float-liquid 20s ease-in-out infinite;
}
</style>
