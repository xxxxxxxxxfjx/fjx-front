import { ref } from 'vue'
import { defineStore } from 'pinia'
import { THEME_LIGHT, THEME } from '@/constants'
import { setItem, getItem } from '@/utils/store'
const defaults = {
  theme: getItem(THEME) || THEME_LIGHT
}

const useThemeStore = defineStore('theme', () => {
  const theme = ref(defaults.theme)

  function setTheme(newTheme) {
    theme.value = newTheme
    setItem(THEME, newTheme)
  }
  return { theme, setTheme }
})
export { useThemeStore }
