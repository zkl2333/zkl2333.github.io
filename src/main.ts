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

const app = createApp(App);

app.use(router);

app.mount("#app");
