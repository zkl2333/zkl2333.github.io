<script setup lang="ts">
import { ref } from "vue";
import { Icon } from "@iconify/vue";
import { useGitHubData } from "@/composables/useGitHubData";
import { useBackgroundAnimation } from "@/composables/useBackgroundAnimation";
import { socialLinks } from "@/constants/social-links";
import AnimatedBackground from "@/components/AnimatedBackground.vue";
import ProfileHeader from "@/components/ProfileHeader.vue";
import ProjectCard from "@/components/ProjectCard.vue";
import ContributionCard from "@/components/ContributionCard.vue";
import MobileToggle from "@/components/MobileToggle.vue";
import SocialLinks from "@/components/SocialLinks.vue";
import PageFooter from "@/components/PageFooter.vue";

// GitHub 数据
const { projects, contributions, loading, error } = useGitHubData();

// 背景动画
const { blobs, spotlight, cardRef, handleMouseLeave } =
	useBackgroundAnimation();

// 移动端展开状态
const isProjectsExpanded = ref(false);
const isContributionsExpanded = ref(false);
</script>

<template>
	<div
		class="min-h-screen bg-[#F0F2F5] text-gray-800 overflow-hidden relative font-sans selection:bg-cyan-500/20"
	>
		<!-- Liquid Mesh Background -->
		<AnimatedBackground :blobs="blobs" />

		<div
			class="relative z-20 flex flex-col items-center justify-center min-h-screen p-4"
		>
            <!-- Liquid Glass Card -->
            <div
                ref="cardRef"
                class="liquid-card group relative p-6 md:p-12 rounded-3xl md:rounded-[3rem] max-w-5xl w-full transition-all duration-500 overflow-hidden mx-4 md:mx-0 ring-1 ring-white/40"
                @mouseleave="handleMouseLeave"
            >
				<!-- Dynamic Spotlight -->
				<div
					class="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
					:style="{
						opacity: spotlight.opacity,
						background: `radial-gradient(600px circle at ${spotlight.x}px ${spotlight.y}px, rgba(255,255,255,0.4), transparent 40%)`,
					}"
				></div>

				<!-- Inner Reflection/Highlight -->
				<div
					class="absolute inset-0 rounded-[2.5rem] border border-white/40 shadow-[inset_0_0_20px_rgba(255,255,255,0.5)] pointer-events-none"
				></div>

				<!-- Profile Header -->
				<ProfileHeader />

				<!-- Mobile Toggle Projects Button -->
				<MobileToggle
					v-model="isProjectsExpanded"
					expand-text="查看我的项目"
					collapse-text="收起项目列表"
				/>

				<!-- GitHub Projects Grid -->
				<div
					class="mb-8 md:mb-12 relative z-10 animate-fade-up transition-all duration-500 ease-in-out"
					:class="[
						isProjectsExpanded
							? 'opacity-100 max-h-[2000px]'
							: 'max-h-0 opacity-0 overflow-hidden md:max-h-none md:opacity-100 md:overflow-visible',
					]"
					style="animation-delay: 0.2s"
				>
					<div
						v-if="loading"
						class="grid grid-cols-1 md:grid-cols-3 gap-4"
					>
						<div
							v-for="i in 6"
							:key="i"
							class="h-32 rounded-2xl bg-white/20 animate-pulse"
						></div>
					</div>
					<div
						v-else-if="error"
						class="flex flex-col items-center justify-center py-8 text-gray-500 gap-2"
					>
						<Icon
							icon="tabler:mood-sad"
							class="w-8 h-8 opacity-60"
						/>
						<p class="text-sm">暂时无法获取项目列表</p>
					</div>
					<div v-else class="grid grid-cols-1 md:grid-cols-3 gap-4">
						<ProjectCard
							v-for="project in projects"
							:key="project.name"
							:project="project"
						/>
					</div>
				</div>

				<!-- Open Source Contributions -->
				<div
					class="mb-8 md:mb-12 relative z-10 animate-fade-up transition-all duration-500 ease-in-out"
					:class="[
						isContributionsExpanded
							? 'opacity-100 max-h-[5000px]'
							: 'max-h-0 opacity-0 overflow-hidden md:max-h-none md:opacity-100 md:overflow-visible',
					]"
					style="animation-delay: 0.25s"
				>
					<div
						v-if="contributions.length > 0"
						class="grid grid-cols-1 md:grid-cols-3 gap-4"
					>
						<ContributionCard
							v-for="repo in contributions"
							:key="repo.repo_url"
							:repo="repo"
						/>
					</div>
				</div>

				<!-- Mobile Toggle Contributions Button -->
				<MobileToggle
					v-model="isContributionsExpanded"
					expand-text="查看开源贡献"
					collapse-text="收起贡献列表"
				/>

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
</style>
