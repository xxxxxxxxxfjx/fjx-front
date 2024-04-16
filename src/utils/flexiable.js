import { computed } from 'vue'
import { PC_DEVICE_WIDTH } from '@/constants'
import { useWindowSize } from '@vueuse/core'

const { width } = useWindowSize()
export const isMobileTerminal = computed(() => {
  return width.value < PC_DEVICE_WIDTH
})

/**
 * 判断当前是否为移动设备
 */
// export const isMobileTerminal = computed(() => {
//   return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
//      navigator.userAgent
//   )
// })

export const useREM = () => {
  const MAX_FONT_SIZE = 40
  document.addEventListener('DOMContentLoaded', () => {
    const htmlEl = document.documentElement
    let fontSize = window.innerWidth / 10
    fontSize = fontSize > MAX_FONT_SIZE ? MAX_FONT_SIZE : fontSize
    htmlEl.style.fontSize = fontSize + 'px'
  })
}
