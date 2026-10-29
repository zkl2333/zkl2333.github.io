<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { useTheme } from "@/composables/useTheme";
import { getTableFortune, type TableAction } from "@/lib/table-fortune";

const emit = defineEmits<{ fortune: [text: string] }>();
const { isDark, setTheme } = useTheme();
const host = ref<HTMLDivElement>();
const canvas = ref<HTMLCanvasElement>();
const ready = ref(false);
const unavailable = ref(false);
const reducedMotion = ref(false);
const sequence = ref(0);
let scene: import("@/lib/table-scene").TableScene | undefined;
let intersectionObserver: IntersectionObserver | undefined;
let motionQuery: MediaQueryList | undefined;

const onMotionChange = () => {
	reducedMotion.value = motionQuery?.matches ?? false;
	scene?.setReducedMotion(reducedMotion.value);
};

const onAction = (action: TableAction) => {
	if (action === "lamp") {
		setTheme(isDark.value ? "light" : "dark");
		return;
	}
	sequence.value++;
	emit("fortune", getTableFortune(action, sequence.value).text);
};

watch(isDark, (value) => scene?.setDark(value));

onMounted(async () => {
	motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
	reducedMotion.value = motionQuery.matches;
	motionQuery.addEventListener("change", onMotionChange);
	if (!canvas.value || !host.value) return;
	try {
		const { TableScene } = await import("@/lib/table-scene");
		scene = new TableScene(canvas.value, {
			isDark: isDark.value,
			reducedMotion: reducedMotion.value,
			onAction,
			onReady: () => (ready.value = true),
			onError: () => (unavailable.value = true),
		});
		scene.init();
		intersectionObserver = new IntersectionObserver(
			([entry]) => scene?.setVisible(entry.isIntersecting),
			{ rootMargin: "120px" },
		);
		intersectionObserver.observe(host.value);
	} catch {
		unavailable.value = true;
	}
});

onBeforeUnmount(() => {
	motionQuery?.removeEventListener("change", onMotionChange);
	intersectionObserver?.disconnect();
	scene?.dispose();
});
</script>

<template>
	<div ref="host" class="table-vignette" :class="{ 'is-ready': ready }">
		<div class="table-vignette__wash" aria-hidden="true"></div>
		<canvas
			ref="canvas"
			aria-label="互动小饭桌：点茶杯换一句问候，点台灯切换日夜，拖动可换个角度看看。"
			role="img"
		></canvas>
		<div v-if="!ready && !unavailable" class="table-vignette__loading meta" aria-live="polite">
			<span class="table-vignette__loader"></span>
			正在摆好小饭桌…
		</div>
		<div v-if="unavailable" class="table-vignette__fallback" aria-label="小饭桌静态示意">
			<span>◐</span><span>♨</span><span>▰</span>
		</div>
	</div>
</template>

<style scoped>
.table-vignette {
	position: relative;
		flex: 0 0 350px;
		align-self: center;
		height: 260px;
		min-height: 260px;
		margin: -1.5rem -2rem -1.5rem -1rem;
}

.table-vignette__wash {
	position: absolute;
	inset: 8% 0 0;
	border-radius: 50%;
	background: radial-gradient(ellipse, color-mix(in oklch, var(--color-accent) 9%, transparent), transparent 68%);
	pointer-events: none;
}

.table-vignette canvas {
	position: relative;
	display: block;
	width: 100%;
	height: 100%;
	min-height: 260px;
	touch-action: pan-y;
	outline-offset: -5px;
	mask-image: radial-gradient(ellipse at 50% 47%, black 48%, transparent 76%);
}

.table-vignette__loading,
.table-vignette__fallback {
	position: absolute;
	inset: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 0.5rem;
	color: var(--color-muted);
	font-size: 0.68rem;
}

.table-vignette__fallback {
	gap: 1.5rem;
	font-size: 3rem;
	color: var(--color-accent);
}

.table-vignette__loader {
	width: 15px;
	height: 15px;
	border: 1px solid var(--color-border);
	border-top-color: var(--color-accent);
	border-radius: 50%;
	animation: table-spin 1.4s linear infinite;
}

@media (min-width: 1200px) {
	.table-vignette { flex-basis: 375px; }
}

@media (max-width: 767px) {
	.table-vignette {
		flex-basis: auto;
		align-self: center;
		width: 230px;
		height: 155px;
		min-height: 155px;
		margin: -0.75rem 0 0.6rem;
		order: -1;
	}
	.table-vignette canvas {
		min-height: 155px;
		mask-image: radial-gradient(ellipse at 50% 47%, black 43%, transparent 78%);
	}
}

@media (prefers-reduced-motion: reduce) {
	.table-vignette__loader { animation: none; }
}

@keyframes table-spin { to { transform: rotate(360deg); } }
</style>
