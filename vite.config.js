import vue from "@vitejs/plugin-vue";
import md from "./plugins/md";
import path from "path";

/**
 * https://vitejs.dev/config/
 * @type {import('vite').UserConfig}
 */
export default {
	plugins: [vue(), md()],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
};
