<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { formatNumber } from "@/utils/format";
import { getLangColor } from "@/constants/lang-colors";
import type { Repo } from "@/types/github";

interface Props {
	project: Repo;
}

defineProps<Props>();
</script>

<template>
	<article class="card flex flex-col h-full">
		<!-- Header: Icon + Title + Stars -->
		<div class="flex items-start justify-between gap-3 mb-3">
			<div class="flex items-center gap-2.5 min-w-0 flex-1">
				<Icon
					icon="tabler:folder"
					class="w-5 h-5 shrink-0 text-[var(--color-accent)]"
				/>
				<h3
					class="font-bold text-base text-[var(--color-accent-2)] truncate leading-snug"
					:title="project.name"
				>
					<a
						:href="project.html_url"
						target="_blank"
						rel="noopener noreferrer"
						:aria-label="`View project: ${project.name}`"
						class="card__link"
					>
						{{ project.name }}
					</a>
				</h3>
			</div>

			<span class="meta flex items-center gap-1 shrink-0">
				<Icon
					icon="tabler:star-filled"
					class="w-3.5 h-3.5 text-[var(--color-accent-warm)]"
				/>
				{{ formatNumber(project.stargazers_count) }}
			</span>
		</div>

		<!-- Body: Description -->
		<p class="text-sm text-[var(--color-muted)] line-clamp-2 mb-4 grow leading-relaxed">
			{{ project.description }}
		</p>

		<!-- Footer: Language -->
		<div
			class="meta flex items-center gap-2 mt-auto pt-3 border-t border-[var(--color-border)]"
		>
			<span
				class="w-2.5 h-2.5 rounded-full"
				:class="getLangColor(project.language)"
			></span>
			<span>{{ project.language }}</span>
		</div>
	</article>
</template>
