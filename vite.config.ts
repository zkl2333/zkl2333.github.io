import vue from "@vitejs/plugin-vue";
import path from "path";
import { defineConfig } from "vite";
import Icons from "unplugin-icons/vite";
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		tailwindcss(),
		vue(),
		Icons({
			compiler: "vue3",
			autoInstall: true,
		}),
	],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
});
