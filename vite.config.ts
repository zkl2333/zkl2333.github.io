import vue from "@vitejs/plugin-vue";
import path from "path";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [tailwindcss(), vue()],
	resolve: {
		alias: {
			"@": path.resolve(import.meta.dirname, "./src"),
		},
	},
});
