import { ref, onMounted } from "vue";

/**
 * 检测是否为移动设备的 composable
 * @returns {boolean} 是否为移动设备
 */
export const useMobileDetection = () => {
	const isMobile = ref(false);

	const detectMobile = () => {
		return (
			window.matchMedia("(pointer: coarse)").matches ||
			"ontouchstart" in window ||
			navigator.maxTouchPoints > 0
		);
	};

	onMounted(() => {
		isMobile.value = detectMobile();
	});

	return { isMobile };
};
