import { ref, watch, onMounted } from 'vue'

type Theme = 'light' | 'dark' | 'system'

const currentTheme = ref<Theme>('system')
const isDark = ref(false)

export function useTheme() {
  const updateTheme = () => {
    const theme = currentTheme.value
    const root = document.documentElement
    
    if (theme === 'system') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      isDark.value = prefersDark
      if (prefersDark) {
        root.classList.add('dark')
      } else {
        root.classList.remove('dark')
      }
    } else if (theme === 'dark') {
      isDark.value = true
      root.classList.add('dark')
    } else {
      isDark.value = false
      root.classList.remove('dark')
    }
  }

  const setTheme = (theme: Theme) => {
    currentTheme.value = theme
    localStorage.setItem('theme', theme)
    updateTheme()
  }

  // 监听系统主题变化
  onMounted(() => {
    const savedTheme = localStorage.getItem('theme') as Theme | null
    if (savedTheme) {
      currentTheme.value = savedTheme
    }
    updateTheme()

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    mediaQuery.addEventListener('change', () => {
      if (currentTheme.value === 'system') {
        updateTheme()
      }
    })
  })

  watch(currentTheme, updateTheme)

  return {
    theme: currentTheme,
    isDark,
    setTheme,
  }
}
