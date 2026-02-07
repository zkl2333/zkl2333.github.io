<script setup lang="ts">
import { useMobileDetection } from "@/composables/useMobileDetection";

interface Blob {
	x: number;
	y: number;
	color: string;
	size: string;
}

interface Props {
	blobs: Blob[];
}

defineProps<Props>();

const { isMobile } = useMobileDetection();
</script>

<template>
	<div class="fixed inset-0 z-0 overflow-hidden pointer-events-none">
		<!-- Glass Overlay for Noise/Texture - 移动端隐藏以提升性能 -->
		<div
			class="absolute inset-0 z-20 opacity-40 mix-blend-overlay pointer-events-none"
			:class="{ hidden: isMobile }"
			style="
				background-image: url(&quot;data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E&quot;);
			"
		></div>

		<!-- 背景模糊层 - 移动端减少模糊以提升性能 -->
		<div
			class="absolute inset-0 bg-[#F0F2F5] dark:bg-[#0f0f0f] z-10"
			:class="isMobile ? 'backdrop-blur-[10px]' : 'backdrop-blur-[80px]'"
			style="min-height: 100dvh; min-height: -webkit-fill-available"
		></div>
		<!-- Animated Blobs - 移动端优化性能 -->
		<div
			v-for="(blob, i) in blobs"
			:key="i"
			class="absolute rounded-full mix-blend-multiply opacity-70"
			:class="[
				blob.color,
				blob.size,
				// 移动端大幅减少模糊半径以提升性能
				isMobile ? 'blur-[20px]' : 'blur-[100px]',
				// 移动端禁用动画以节省性能
				isMobile ? '' : 'animate-float-liquid',
				'filter',
				// 移动端使用 will-change 优化
				isMobile ? 'will-change-transform' : '',
			]"
			:style="{
				left: blob.x + '%',
				top: blob.y + '%',
				transform: 'translate(-50%, -50%)',
				animationDelay: isMobile ? 'none' : i * 3 + 's',
				backfaceVisibility: isMobile ? 'hidden' : 'visible',
			}"
		></div>
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
	/* 使用硬件加速 */
	will-change: transform;
	backface-visibility: hidden;
}

/* 移动端性能优化 - 减少重绘 */
@media (max-width: 768px) {
	.fixed {
		contain: strict;
	}
}
</style>
