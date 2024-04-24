import { useIntersectionObserver } from '@vueuse/core'
export default {
  mounted(el, binding) {
    const src = el.src
    el.src = ''
    const { stop } = useIntersectionObserver(([{ isIntersecting }]) => {
      if (isIntersecting) {
        el.src = src
        stop()
      }
    })
  }
}
