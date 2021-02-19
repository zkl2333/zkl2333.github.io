<template>
	<div class="container">
		<router-view />
	</div>
</template>

<style lang="scss">
.button {
	transition: all 0.1s ease-in;
	margin: 10px;
	display: inline-block;
	white-space: nowrap;
	cursor: pointer;
	background: #444;
	letter-spacing: 1px;
	font-size: 14px;
	border: 1px solid #ccc;
	line-height: 36px;
	text-align: center;
	height: 36px;
	padding: 0 25px;
	border-radius: 16px;
	transition-duration: 400ms;
	background-color: #fff;
	color: #999;
	&:hover {
		color: #f77b83;
		border-color: #f77b83;
		outline-style: none;
	}
}
// 选中文字
::selection {
	background: #d3d3d3;
	color: #555;
}
a {
	color: #333;
	text-decoration: none;
}
.container {
	min-height: var(--app-height, 100vh);
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;
	padding: 10px;
	box-sizing: border-box;
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
		background: #fcfcfc;
	}
}
</style>