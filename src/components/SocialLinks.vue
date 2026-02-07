<script setup lang="ts">
import { Icon } from "@iconify/vue";
import type { SocialLink } from "@/types/social";
import { useMobileDetection } from "@/composables/useMobileDetection";

interface Props {
	links: SocialLink[];
}

defineProps<Props>();
const { isMobile } = useMobileDetection();
</script>

<template>
	<div
		class="flex flex-wrap justify-center gap-3 md:gap-6 relative z-10 animate-fade-up px-2"
		style="animation-delay: 0.3s"
	>
		<a
			v-for="link in links"
			:key="link.url"
			:href="link.url"
			target="_blank"
			rel="noopener noreferrer"
			:aria-label="link.label"
			:style="{
				minWidth: isMobile ? '48px' : '56px',
				minHeight: isMobile ? '48px' : '56px',
			}"
			class="relative flex items-center justify-center w-12 h-12 sm:w-13 sm:h-13 md:w-14 md:h-14 min-w-[44px] min-h-[44px] rounded-2xl bg-white/40 dark:bg-gray-800/40 border border-white/50 dark:border-gray-700/50 text-gray-500 dark:text-gray-400 transition-all duration-200 backdrop-blur-md overflow-hidden cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900"
			:class="[
				link.color,
				isMobile
					? 'active:scale-95 active:bg-white/60 dark:active:bg-gray-700/60'
					: 'hover:scale-110 hover:shadow-lg hover:shadow-purple-500/20 group/btn active:scale-95',
			]"
		>
			<div
				v-if="!isMobile"
				class="absolute inset-0 bg-linear-to-tr from-white/0 via-white/40 to-white/0 opacity-0 group-hover/btn:opacity-100 transform -translate-x-full group-hover/btn:translate-x-full transition-all duration-700"
			></div>
			<Icon
				:icon="link.icon"
				class="w-6 h-6 relative z-10"
				:class="
					isMobile
						? ''
						: 'transition-transform group-hover/btn:scale-110'
				"
			/>
		</a>
	</div>
</template>
