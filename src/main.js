import { createApp } from "vue";
import App from "./App.vue";
import "./assets/style.css";

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

createApp(App).mount("#app");
