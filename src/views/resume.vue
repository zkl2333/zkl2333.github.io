<template>
	<div id="resume">
		<router-link to="/">
			<div class="button">返回</div>
		</router-link>
		<section class="markdown-body" v-html="resume" />
		<router-link to="/">
			<div class="button">返回</div>
		</router-link>
	</div>
</template>

<script>
import resume from "@/assets/张克凌-前端工程师.md";
export default {
	setup() {
		return { resume };
	},
};
</script>

<style lang="scss" scoped>
#resume {
	padding: 20px;
	width: 100%;
	max-width: 800px;
	:deep(.markdown-body) {
		color: #333;
		a {
			color: #4a8576;
			&:hover {
				opacity: 0.6;
			}
		}
		del {
			color: #999;
		}
		p {
			margin-top: 0;
			margin-bottom: 16px;
		}
		h1,
		h2,
		h3 {
			margin-top: 24px;
			margin-bottom: 16px;
			font-weight: 600;
			line-height: 1.25;
			&::before {
				content: "# ";
				color: #4a8576;
			}
		}
		h1 {
			font-size: 3em;
			padding: 0;
			margin-top: 0;
		}
		h2 {
			font-size: 2em;
		}
		h3 {
			font-size: 1.5em;
		}
		hr {
			border: none;
			height: 1px;
			background: #eeeeee;
		}
		li {
			margin: 5px 0;
		}
	}
}
</style>
