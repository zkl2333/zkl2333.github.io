<template>
	<div id="main">
		<img id="logo" :src="logo" />
		<router-link to="/resume">
			<div class="button">查看简历</div>
		</router-link>
		<div id="dis">
			<p>你好，很高兴见到你</p>
			<p>我叫 多吃点，常用 ID:zkl2333</p>
			<p>是一个很菜的前端爱好者，你可以通过以下方式找到我</p>
		</div>
		<nav>
			<ul id="group-logo">
				<li v-for="icon in icons" :key="icon.url">
					<a :href="icon.url">
						<i :class="icon.iconfont" />
					</a>
				</li>
			</ul>
		</nav>
		<footer>
			<i class="fa fa-copyright"></i>
			<b>zkl2333 2017-2021</b>
			<br />
			<a href="https://beian.miit.gov.cn">浙ICP备17004361号-1</a>
		</footer>
	</div>
</template>

<script lang="ts">
import logo from "@/assets/logo.jpeg";
export default {
	setup() {
		const icons = [
			{ url: "https://github.com/zkl2333", iconfont: "fa fa-github" },
			{
				url: "https://www.zkl2333.com",
				iconfont: "fa fa-home",
			},
			{
				url: "https://twitter.com/zkl2333",
				iconfont: "fa fa-twitter",
			},
			{
				url: "mailto:i@zkl2333.com",
				iconfont: "fa fa-envelope-o",
			},
			{
				url: "http://weibo.com/zkl2333",
				iconfont: "fa fa-weibo",
			},
		];
		return { logo, icons };
	},
};
</script>

<style lang="scss" scoped>
#main {
	text-align: center;
	#logo {
		border: rgba(0, 0, 0, 0.1) solid 5px;
		display: block;
		width: 30vw;
		max-width: 8rem;
		margin: 50px auto 30px auto;
		border-radius: 50%;
		box-shadow: 0px 0px 20px 2px #888888;
		&:hover {
			box-shadow: 0px 0px 10px 2px #888888;
		}
	}
	#dis {
		margin: 20px;
		p {
			text-align: center;
			font-size: 20px;
			@media all and (max-width: 768px) {
				font-size: 14px;
			}
			margin: 10px;
		}
	}
	nav {
		margin: 10px 0 0 0;
		#group-logo {
			text-align: center;
			margin: auto;
			padding: 0;
			margin-bottom: 100px;
			li {
				display: inline-block;
				list-style: none;
				a {
					width: 4rem;
					@media all and (max-width: 768px) {
						width: 3rem;
					}
					line-height: 2rem;
					display: inline-block;
					i {
						font-size: 38px;
						@media all and (max-width: 768px) {
							font-size: 28px;
						}
						&.fa {
							&:before {
								color: #333333;
							}
							&:hover:before {
								color: #eeeeee;
								text-shadow: 0px 0px 10px #888888;
							}
						}
					}
				}
			}
		}
	}
	footer {
		position: absolute;
		bottom: 20px;
		left: 0;
		right: 0;
		width: 100%;
		text-align: center;
		@media all and (max-width: 768px) {
			font-size: 14px;
		}
		a {
			&:hover {
				opacity: 0.6;
			}
		}
	}
}
</style>
