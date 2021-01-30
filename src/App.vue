<template>
	<div class="container">
		<div id="main">
			<img id="logo" src="./assets/logo.jpeg" />
			<!-- <h1>张克凌</h1> -->
			<div class="dis">
				<p>你好，很高兴见到你。</p>
				<p>我叫 张克凌，常用 ID:zkl2333</p>
				<p>是一个很菜的前端爱好者。你可以通过以下方式勾搭我。</p>
			</div>
			<nav>
				<ul class="group-logo">
					<li v-for="icon in icons">
						<a :href="icon.url"><i :class="icon.iconfont" /></a>
					</li>
				</ul>
			</nav>
			<footer>
				<i class="fa fa-copyright"></i><b>zkl2333 2017-2020</b><br />
				<a href="https://beian.miit.gov.cn">浙ICP备17004361号-1</a>
			</footer>
		</div>
	</div>
</template>

<script setup>
let icons = [
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
</script>

<style lang="scss" scoped>
.container {
	min-height: var(--app-height, 100vh);
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;
	// 选中文字
	::selection {
		background: #d3d3d3;
		color: #555;
	}
	&::before {
		box-shadow: #333333 0px 0px 10px 0px;
		content: "";
		z-index: -1;
		position: absolute;
		top: 10px;
		bottom: 10px;
		left: 10px;
		right: 10px;
		border-radius: 0.8rem;
		background: #fafafa;
	}
	#main {
		footer {
			position: absolute;
			bottom: 20px;
			left: 0;
			right: 0;
			width: 100%;
			text-align: center;
		}
	}
}
p,
b {
	font-family: "PingFang SC", "Helvetica Neue", "Helvetica", "Arial",
		"Hiragino Sans GB", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;
	margin: 5px;
}
a {
	color: #666;
	text-decoration: none;
}
h1,
p {
	user-select: text;
}
#main {
	padding-bottom: 10vh;
}
nav {
	margin: 20px 0;
}
#main ul li a {
	width: 4rem;
}
.group-logo li a i.fa:before {
	font-size: 2.5em;
	line-height: 3rem;
}
#logo {
	border-style: solid;
	border-width: 5px;
	border-color: rgba(0, 0, 0, 0.1);
	display: block;
	width: 30vw;
	max-width: 8rem;
	margin: 50px auto;
	border-radius: 50%;
	box-shadow: 0px 0px 20px 2px #888888;
}
#logo:hover {
	box-shadow: 0px 0px 10px 2px #888888;
}
#main > h1 {
	text-align: center;
	margin: 0.5rem auto;
	font-size: 30px;
}
#main .dis {
	margin: 20px;
}
#main .dis > p {
	text-align: center;
	font-size: 20px;
}
#main ul {
	text-align: center;
	margin: auto;
	padding: 0;
	margin-bottom: 100px;
}
#main ul li {
	display: inline-block;
	list-style: none;
}
#main ul li a {
	line-height: 2rem;
	display: inline-block;
}
.group-logo li a i.fa:before {
	color: #333333;
}
.group-logo li a i.fa:hover:before {
	color: #eeeeee;
	text-shadow: 0px 0px 10px #888888;
}
@media all and (max-width: 375px) {
	#main .dis > p {
		font-size: 16px;
		padding: 0 10px;
	}
	#main {
		padding-bottom: 0;
	}
}
</style>