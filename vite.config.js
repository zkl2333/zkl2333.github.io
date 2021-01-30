import vue from "@vitejs/plugin-vue";
const path = require("path");

console.log(path.resolve(__dirname, "src"));

/**
 * https://vitejs.dev/config/
 * @type {import('vite').UserConfig}
 */
export default {
	plugins: [vue()],
};
