import { createApp } from "vue";
import App from "@/App.vue";
import "@/assets/style.css";

import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/home.vue";
import Resume from "@/views/resume.vue";

const routes = [
	{
		path: "/",
		component: Home,
	},
	{
		path: "/resume",
		component: Resume,
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

function debounce(func) {
	var timer;
	return function (event) {
		if (timer) clearTimeout(timer);
		timer = setTimeout(func, 100, event);
	};
}

function setAppHeight() {
	const doc = document.documentElement;
	doc.style.setProperty("--app-height", `${window.innerHeight}px`);
}

window.onresize = debounce((e) => {
	console.log("resoze");
	setAppHeight();
});

setAppHeight();

const app = createApp(App);

app.use(router);

app.mount("#app");
