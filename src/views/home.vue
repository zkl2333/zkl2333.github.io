<script setup lang="ts">
import { ref, onMounted } from "vue";
import { Icon } from "@iconify/vue";
import { useGitHubData } from "@/composables/useGitHubData";
import { useGreeting } from "@/composables/useGreeting";
import { getGravatarUrl, getFastestGravatar } from "@/utils/gravatar";
import { socialLinks } from "@/constants/social-links";
import ProjectCard from "@/components/ProjectCard.vue";
import ContributionCard from "@/components/ContributionCard.vue";
import SocialLinks from "@/components/SocialLinks.vue";
import PageFooter from "@/components/PageFooter.vue";
import ThemeToggle from "@/components/ThemeToggle.vue";

// GitHub 数据
const { projects, contributions, loading, error } = useGitHubData();

// 问候语
const { greeting } = useGreeting();

// Gravatar 头像
const email = "i@zkl2333.com";
const avatarUrl = ref(getGravatarUrl(email, 256, "identicon"));

onMounted(() => {
	getFastestGravatar(email, 256, "identicon").then((url) => {
		avatarUrl.value = url;
	});
});
</script>

<template>
	<div class="min-h-screen">
		<div
			class="mx-auto flex max-w-4xl lg:max-w-6xl flex-col px-4 sm:px-8 pt-16"
		>
			<!-- 页头：头像 + 名字 + 主题切换 + 社交链接 -->
			<header
				class="mb-12 md:mb-16 flex flex-wrap items-center justify-between gap-x-6 gap-y-4 animate-fade-up"
			>
				<div class="flex items-center gap-4 min-w-0">
					<img
						:src="avatarUrl"
						alt="Avatar"
						class="h-12 w-12 shrink-0 rounded-full object-cover border border-[var(--color-border)] transition-transform duration-300 hover:-rotate-6 hover:scale-[1.04]"
					/>
					<div class="min-w-0">
						<h1 class="text-[1.3rem] font-bold leading-tight">多吃点</h1>
						<p class="meta truncate">@zkl2333 · 一个热爱生活的可爱男孩</p>
					</div>
				</div>
				<div class="flex items-center gap-1">
					<SocialLinks :links="socialLinks" />
					<ThemeToggle />
				</div>
			</header>

			<!-- Hero：问候 + 简介 -->
			<section
				class="card p-6 md:p-8 mb-12 md:mb-16 animate-fade-up"
				style="animation-delay: 0.1s"
			>
				<p class="meta mb-3">{{ greeting }}</p>
				<p class="text-base leading-relaxed">
					写写前端、折腾点代码，偶尔做些小工具。长文写在
					<a
						href="https://blog.zkl2333.com"
						target="_blank"
						rel="noopener noreferrer"
						class="hero-link"
						>博客</a
					>，代码都放在
					<a
						href="https://github.com/zkl2333"
						target="_blank"
						rel="noopener noreferrer"
						class="hero-link"
						>GitHub</a
					>。不写代码的时候，多半在琢磨下一顿吃什么。
				</p>
			</section>

			<!-- GitHub 项目 -->
			<section class="mb-12 md:mb-16 animate-fade-up" style="animation-delay: 0.2s">
				<div class="section-head">
					<span class="section-head__dot"></span>
					<h2 class="section-head__title">GitHub 项目</h2>
				</div>

				<div
					v-if="loading"
					class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
				>
					<div
						v-for="i in 6"
						:key="i"
						class="card h-32 animate-pulse"
					></div>
				</div>
				<div
					v-else-if="error"
					class="card flex flex-col items-center justify-center py-8 gap-2 text-[var(--color-muted)]"
				>
					<Icon icon="tabler:mood-sad" class="w-8 h-8 opacity-60" />
					<p class="text-sm">暂时无法获取项目列表</p>
				</div>
				<div
					v-else
					class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
				>
					<ProjectCard
						v-for="project in projects"
						:key="project.name"
						:project="project"
					/>
				</div>
			</section>

			<!-- 开源贡献 -->
			<section
				v-if="contributions.length > 0"
				class="mb-12 md:mb-16 animate-fade-up"
				style="animation-delay: 0.25s"
			>
				<div class="section-head">
					<span class="section-head__dot"></span>
					<h2 class="section-head__title">开源贡献</h2>
				</div>
				<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
					<ContributionCard
						v-for="repo in contributions"
						:key="repo.repo_url"
						:repo="repo"
					/>
				</div>
			</section>

			<!-- Footer -->
			<PageFooter />
		</div>
	</div>
</template>

<style scoped>
/* Entrance Animations */
.animate-fade-up {
	animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) backwards;
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
</style>
