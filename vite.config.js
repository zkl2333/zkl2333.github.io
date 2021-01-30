import vue from "@vitejs/plugin-vue";
import md from "./plugins/md";

/**
 * https://vitejs.dev/config/
 * @type {import('vite').UserConfig}
 */
export default {
	plugins: [vue(), md()],
};
