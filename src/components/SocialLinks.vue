<script setup lang="ts">
import { Icon } from "@iconify/vue";
import type { SocialLink } from "@/types/social";

interface Props {
	links: SocialLink[];
}

defineProps<Props>();
</script>

<template>
	<nav class="flex flex-wrap items-center gap-1" aria-label="社交链接">
		<a
			v-for="link in links"
			:key="link.url"
			:href="link.url"
			target="_blank"
			rel="noopener noreferrer"
			:aria-label="link.label"
			class="nav-chip"
		>
			<Icon :icon="link.icon" class="w-4.5 h-4.5" />
			<span class="text-[0.8rem]">{{ link.label }}</span>
		</a>
	</nav>
</template>
