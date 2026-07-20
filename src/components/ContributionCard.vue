<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { formatNumber } from "@/utils/format";
import type { ContributionRepo } from "@/types/github";

interface Props {
	repo: ContributionRepo;
}

defineProps<Props>();
</script>

<template>
	<article class="card flex flex-col h-full">
		<!-- Header: Icon + Title + Stars -->
		<div class="flex items-start justify-between gap-3 mb-3">
			<div class="flex items-center gap-2.5 min-w-0 flex-1">
				<Icon
					icon="tabler:brand-github"
					class="w-5 h-5 shrink-0 text-[var(--color-accent)]"
				/>
				<h3
					class="font-bold text-base text-[var(--color-accent-2)] truncate leading-snug"
					:title="repo.repo_full_name"
				>
					<a
						:href="repo.repo_url"
						target="_blank"
						rel="noopener noreferrer"
						class="card__link"
					>
						{{ repo.repo_full_name }}
					</a>
				</h3>
			</div>

			<span class="meta flex items-center gap-1 shrink-0">
				<Icon
					icon="tabler:star-filled"
					class="w-3.5 h-3.5 text-[var(--color-accent-warm)]"
				/>
				{{ formatNumber(repo.stars) }}
			</span>
		</div>

		<!-- Body: Description -->
		<p class="text-sm text-[var(--color-muted)] line-clamp-2 mb-4 leading-relaxed">
			{{ repo.description }}
		</p>

		<!-- PR 列表 -->
		<div class="space-y-2 mb-4 grow">
			<a
				v-for="pr in repo.prs.slice(0, 3)"
				:key="pr.html_url"
				:href="pr.html_url"
				target="_blank"
				rel="noopener noreferrer"
				class="pr-row"
			>
				<Icon
					v-if="pr.state === 'MERGED'"
					icon="pajamas:git-merge"
					class="w-4 h-4 shrink-0 text-[var(--color-accent)]"
				/>
				<Icon
					v-else-if="pr.state === 'OPEN'"
					icon="pajamas:git-pull-request"
					class="w-4 h-4 shrink-0 text-green-600 dark:text-green-400"
				/>
				<Icon
					v-else
					icon="pajamas:git-pull-request-closed"
					class="w-4 h-4 shrink-0 text-[var(--color-muted)]"
				/>
				<span class="pr-row__title">{{ pr.title }}</span>
			</a>
		</div>

		<!-- Footer: Contributions Count -->
		<div
			class="meta flex items-center justify-end gap-1.5 mt-auto pt-3 border-t border-[var(--color-border)]"
		>
			<Icon icon="tabler:git-pull-request" class="w-4 h-4" />
			<span>{{ repo.prs.length }} Contributions</span>
		</div>
	</article>
</template>

<style scoped>
.pr-row {
	position: relative;
	z-index: 1;
	display: flex;
	align-items: center;
	gap: 0.5rem;
	padding: 0.45rem 0.6rem;
	border-radius: 0.4rem;
	border: 1px solid color-mix(in oklch, var(--color-border) 80%, transparent);
	background: color-mix(in oklch, var(--color-muted) 5%, transparent);
	text-decoration: none;
	transition:
		color 180ms ease,
		border-color 180ms ease,
		background 180ms ease;
}
.pr-row:hover {
	border-color: color-mix(in oklch, var(--color-accent) 35%, var(--color-border));
	background: color-mix(in oklch, var(--color-accent) 5%, transparent);
}
.pr-row__title {
	flex: 1;
	min-width: 0;
	font-size: 0.78rem;
	line-height: 1.5;
	color: var(--color-global-text);
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	transition: color 180ms ease;
}
.pr-row:hover .pr-row__title {
	color: var(--color-accent);
}
</style>
