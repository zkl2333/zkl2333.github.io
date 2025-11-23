import {
	createRouter,
	createWebHistory,
	type RouteRecordRaw,
} from "vue-router";

const routes: RouteRecordRaw[] = [
	{
		path: "/",
		name: "home",
		component: () => import("@/views/home.vue"),
		meta: {
			title: "首页",
		},
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

// Navigation guard to update page title
router.beforeEach((to, _from, next) => {
	if (to.meta.title) {
		document.title = `${to.meta.title} - zkl2333`;
	}
	next();
});

export default router;
