import { watch } from 'vue'
import { useThemeStore } from '@/stores/theme'
import { THEME_DARK, THEME_LIGHT, THEME_SYSTEM } from '@/constants'

let matchMedia
const watchSystemThemeChange = () => {
  if (matchMedia) return
  matchMedia = window.matchMedia('(prefers-color-scheme: dark)')
  matchMedia.onchange = () => {
    changeTheme(THEME_SYSTEM)
  }
}

const changeTheme = (theme) => {
  if (theme === THEME_LIGHT) {
    document.documentElement.className = THEME_LIGHT
  } else if (theme === THEME_DARK) {
    document.documentElement.className = THEME_DARK
  } else if (theme === THEME_SYSTEM) {
    watchSystemThemeChange()
    let theme = matchMedia.matches ? THEME_DARK : THEME_LIGHT
    document.documentElement.className = theme
  }
}

export default function () {
  const themeStore = useThemeStore()
  watch(() => themeStore.theme, changeTheme, {
    immediate: true
  })
}
