import { ref } from 'vue'
import { defineStore } from 'pinia'
import { THEME_LIGHT } from '@/constants'
const useThemeStore = defineStore('theme', () => {
  const theme = ref(THEME_LIGHT)

  function setTheme(newTheme) {
    theme.value = newTheme
  }
  return { theme, setTheme }
})
export { useThemeStore }
