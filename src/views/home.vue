<script setup lang="ts">
import { useGitHubData } from "@/composables/useGitHubData";
import { useBackgroundAnimation } from "@/composables/useBackgroundAnimation";
import { useMobileDetection } from "@/composables/useMobileDetection";
import { socialLinks } from "@/constants/social-links";
import AnimatedBackground from "@/components/AnimatedBackground.vue";
import ProfileHeader from "@/components/ProfileHeader.vue";
import ProjectCard from "@/components/ProjectCard.vue";
import ContributionCard from "@/components/ContributionCard.vue";
import SocialLinks from "@/components/SocialLinks.vue";
import PageFooter from "@/components/PageFooter.vue";
import ThemeToggle from "@/components/ThemeToggle.vue";

// GitHub 数据
const { projects, contributions, loading, error } = useGitHubData();

// 背景动画
const { blobs, spotlight, cardRef, handleMouseLeave } =
	useBackgroundAnimation();

// 移动端检测
const { isMobile } = useMobileDetection();
</script>

<template>
	<ThemeToggle />
	<div
		class="min-h-[100dvh] bg-[#F0F2F5] dark:bg-[#0f0f0f] text-gray-800 dark:text-gray-100 overflow-hidden relative font-sans selection:bg-cyan-500/20 dark:selection:bg-cyan-500/30 transition-colors duration-300"
	>
		<!-- Liquid Mesh Background -->
		<AnimatedBackground :blobs="blobs" />

		<div
			class="relative z-20 flex flex-col items-center justify-center min-h-[100dvh] px-4 safe-area-container"
		>
			<!-- Liquid Glass Card -->
			<div
				ref="cardRef"
				class="liquid-card group relative p-6 md:p-12 rounded-3xl md:rounded-[3rem] max-w-5xl w-full transition-all duration-500 overflow-hidden mx-0 md:mx-0 ring-1 ring-white/40 dark:ring-gray-700/40 dark:bg-gradient-to-br dark:from-gray-800/60 dark:to-gray-900/30"
				:class="isMobile ? '' : 'backdrop-blur-xl'"
				@mouseleave="handleMouseLeave"
			>
				<!-- Dynamic Spotlight -->
				<div
					v-if="!isMobile"
					class="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
					:style="{
						opacity: spotlight.opacity,
						background: `radial-gradient(600px circle at ${spotlight.x}px ${spotlight.y}px, rgba(255,255,255,0.4), transparent 40%)`,
					}"
				></div>

				<!-- Inner Reflection/Highlight -->
				<div
					v-if="!isMobile"
					class="absolute inset-0 rounded-[2.5rem] border border-white/40 dark:border-gray-600/40 shadow-[inset_0_0_20px_rgba(255,255,255,0.5)] dark:shadow-[inset_0_0_20px_rgba(255,255,255,0.05)] pointer-events-none"
				></div>

				<!-- Profile Header -->
				<ProfileHeader />

				<!-- GitHub Projects Grid -->
				<div
					class="mb-8 md:mb-12 relative z-10 animate-fade-up"
					style="animation-delay: 0.2s"
				>
					<div
						v-if="loading"
						class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4"
					>
						<div
							v-for="i in 6"
							:key="i"
							class="h-32 rounded-2xl bg-white/20 dark:bg-gray-700/30 animate-pulse"
						></div>
					</div>
					<div
						v-else-if="error"
						class="flex flex-col items-center justify-center py-8 text-gray-500 dark:text-gray-400 gap-2"
					>
						<Icon
							icon="tabler:mood-sad"
							class="w-8 h-8 opacity-60"
						/>
						<p class="text-sm">暂时无法获取项目列表</p>
					</div>
					<div
						v-else
						class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4"
					>
						<ProjectCard
							v-for="project in projects"
							:key="project.name"
							:project="project"
						/>
					</div>
				</div>

				<!-- Open Source Contributions -->
				<div
					class="mb-8 md:mb-12 relative z-10 animate-fade-up"
					style="animation-delay: 0.25s"
				>
					<div
						v-if="contributions.length > 0"
						class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4"
					>
						<ContributionCard
							v-for="repo in contributions"
							:key="repo.repo_url"
							:repo="repo"
						/>
					</div>
				</div>

				<!-- Social Links -->
				<SocialLinks :links="socialLinks" />
			</div>

			<!-- Minimal Footer -->
			<PageFooter />
		</div>
	</div>
</template>

<style scoped>
.liquid-card {
	background: linear-gradient(
		135deg,
		rgba(255, 255, 255, 0.1),
		rgba(255, 255, 255, 0)
	);
	backdrop-filter: blur(40px);
	-webkit-backdrop-filter: blur(40px);
	box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.05);
}

/* 移动端优化 - 减少模糊以提升性能 */
@media (pointer: coarse) {
	.liquid-card {
		backdrop-filter: blur(20px);
		-webkit-backdrop-filter: blur(20px);
	}
}

/* Entrance Animations */
.animate-fade-up {
	animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) backwards;
}

.animate-fade-in {
	animation: fadeIn 1s ease-out backwards;
}

@keyframes fadeUp {
	from {
		opacity: 0;
		transform: translateY(20px);
	}

	to {
		opacity: 1;
		transform: translateY(0);
	}
}

@keyframes fadeIn {
	from {
		opacity: 0;
	}

	to {
		opacity: 1;
	}
}

/* 安全区域优化 - 确保移动端内容不被刘海/底部手势条遮挡 */
.safe-area-container {
	padding-left: max(1rem, env(safe-area-inset-left));
	padding-right: max(1rem, env(safe-area-inset-right));
	padding-top: max(1rem, env(safe-area-inset-top));
	padding-bottom: max(1rem, env(safe-area-inset-bottom));
}

/* 移动端卡片间距优化 */
@media (max-width: 768px) {
	.liquid-card {
		border-radius: 1.5rem;
	}
}
</style>
