<script setup lang="ts">
import { useMobileDetection } from "@/composables/useMobileDetection";
import { Icon } from "@iconify/vue";
import { formatNumber } from "@/utils/format";
import { getLangColor } from "@/constants/lang-colors";
import type { Repo } from "@/types/github";

interface Props {
	project: Repo;
}

defineProps<Props>();

const { isMobile } = useMobileDetection();
</script>

<template>
	<a
		:href="project.html_url"
		target="_blank"
		rel="noopener noreferrer"
		:aria-label="`View project: ${project.name}`"
		:class="[
			'relative p-4 sm:p-5 rounded-2xl bg-white/40 border border-white/40 flex flex-col h-full backdrop-blur-sm overflow-hidden cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2',
			isMobile
				? 'active:scale-98 active:bg-white/60 transition-all duration-150'
				: 'transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/15 group/card active:scale-98',
		]"
	>
		<!-- Card Hover Gradient -->
		<div
			:class="[
				'absolute inset-0 bg-linear-to-br from-blue-500/8 to-purple-500/8 transition-opacity duration-300',
				isMobile
					? 'opacity-0'
					: 'opacity-0 group-hover/card:opacity-100',
			]"
		></div>

		<!-- Header: Icon + Title + Stars -->
		<div
			class="relative z-10 flex items-start justify-between gap-3 sm:gap-4 mb-4"
		>
			<div class="flex items-center gap-3 min-w-0 flex-1">
				<!-- 移动端确保图标容器至少 44x44px -->
				<div
					:class="[
						'p-2 rounded-xl shrink-0 shadow-sm',
						isMobile
							? 'bg-white/50 min-w-[44px] min-h-[44px] flex items-center justify-center'
							: 'bg-white/50 group-hover/card:bg-white/80 transition-colors',
					]"
				>
					<Icon
						icon="tabler:folder"
						:class="[
							'w-6 h-6',
							isMobile
								? 'text-blue-600/90'
								: 'text-blue-600/90 group-hover/card:text-blue-600 transition-colors',
						]"
					/>
				</div>
				<h3
					:class="[
						'font-bold text-base sm:text-lg text-gray-900 truncate leading-snug',
						isMobile
							? ''
							: 'group-hover/card:text-blue-600 transition-colors',
					]"
					:title="project.name"
				>
					{{ project.name }}
				</h3>
			</div>

			<!-- 移动端确保星标至少 44x44px 触控目标 -->
			<div
				:class="[
					'flex items-center gap-1.5 text-xs font-semibold text-gray-600 px-2.5 py-1.5 rounded-lg shrink-0 shadow-sm',
					isMobile
						? 'bg-white/30 min-h-[44px] min-w-[44px] justify-center'
						: 'bg-white/30 group-hover/card:bg-white/60 transition-all',
				]"
			>
				<Icon
					icon="tabler:star-filled"
					class="w-3.5 h-3.5 text-amber-400"
				/>
				{{ formatNumber(project.stargazers_count) }}
			</div>
		</div>

		<!-- Body: Description -->
		<p
			class="relative z-10 text-sm text-gray-600 line-clamp-2 mb-4 grow leading-snug"
		>
			{{ project.description }}
		</p>

		<!-- Footer: Language & Arrow -->
		<div
			class="relative z-10 flex items-center justify-between mt-auto pt-4 border-t border-gray-200/60"
		>
			<div class="flex items-center gap-2 min-h-[24px]">
				<span
					class="w-2.5 h-2.5 rounded-full ring-2 ring-white/50 shadow-sm"
					:class="getLangColor(project.language)"
				></span>
				<span class="text-xs text-gray-600 font-medium">{{
					project.language
				}}</span>
			</div>
			<Icon
				v-if="!isMobile"
				icon="tabler:arrow-up-right"
				class="w-5 h-5 text-gray-400 opacity-0 -translate-x-2 group-hover/card:opacity-100 group-hover/card:translate-x-0 transition-all duration-300"
			/>
		</div>
	</a>
</template>
