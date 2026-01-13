import { reactive, onMounted, onUnmounted, ref } from 'vue'

interface Blob {
    x: number
    y: number
    color: string
    size: string
}

interface Spotlight {
    x: number
    y: number
    opacity: number
}

/**
 * 背景动画和鼠标跟随效果 composable
 */
export const useBackgroundAnimation = () => {
    const blobs = reactive<Blob[]>([
        { x: 30, y: 30, color: 'bg-purple-400', size: 'w-[40rem] h-[40rem]' },
        { x: 70, y: 30, color: 'bg-indigo-400', size: 'w-[30rem] h-[30rem]' },
        { x: 50, y: 70, color: 'bg-cyan-400', size: 'w-[40rem] h-[40rem]' },
        { x: 20, y: 60, color: 'bg-fuchsia-400', size: 'w-80 h-80' },
    ])

    const spotlight = reactive<Spotlight>({ x: 0, y: 0, opacity: 0 })
    const cardRef = ref<HTMLElement | null>(null)

    /**
     * 处理鼠标移动
     */
    const handleMouseMove = (e: MouseEvent) => {
        if (!cardRef.value) return

        const card = cardRef.value
        const rect = card.getBoundingClientRect()

        spotlight.x = e.clientX - rect.left
        spotlight.y = e.clientY - rect.top
        spotlight.opacity = 1
    }

    /**
     * 处理鼠标离开
     */
    const handleMouseLeave = () => {
        spotlight.opacity = 0
    }

    /**
     * 检测是否为移动设备
     */
    const isMobileDevice = () => {
        return window.matchMedia('(pointer: coarse)').matches || 
               'ontouchstart' in window ||
               navigator.maxTouchPoints > 0
    }

    onMounted(() => {
        // 只在非移动设备上启用鼠标追踪
        if (!isMobileDevice()) {
            window.addEventListener('mousemove', handleMouseMove)
        }
    })

    onUnmounted(() => {
        if (!isMobileDevice()) {
            window.removeEventListener('mousemove', handleMouseMove)
        }
    })

    return {
        blobs,
        spotlight,
        cardRef,
        handleMouseLeave,
    }
}
