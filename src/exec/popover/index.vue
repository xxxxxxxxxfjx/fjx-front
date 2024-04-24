<template>
  <div class="relative" @mouseleave="handleMouseLeave" @mouseenter="handleMouseEnter">
    <div ref="referenceRef">
      <slot name="reference" />
    </div>
    <transition name="fade">
      <div v-show="show" ref="targetRef" class="absolute z-20 p-1 rounded bg-white dark:bg-zinc-900 border"
        :style="position">
        <slot />
      </div>
    </transition>
  </div>
</template>

<script>
const BOTTOM_LEFT = 'bottom-left'
const BOTTOM_RIGHT = 'bottom-right'
const TOP_LEFT = 'top-left'
const TOP_RIGHT = 'top-right'
const placementEnum = [BOTTOM_LEFT, BOTTOM_RIGHT, TOP_LEFT, TOP_RIGHT]
</script>

<script setup>
import { ref, reactive, watch, nextTick } from 'vue'

const show = ref(false)

let timer = null
const handleMouseLeave = () => {
  timer = setTimeout(() => {
    show.value = false
  }, 100)
}
const handleMouseEnter = () => {
  show.value = true
  if (timer) {
    clearTimeout(timer)
  }
}

const props = defineProps({
  placement: {
    type: String,
    default: "bottom-left",
    validator(value) {
      const isOk = placementEnum.includes(value)
      if (!isOk) {
        throw new Error(`placement 必须是 ${placementEnum.join('、')} 中的一个`)
      }
      return isOk
    }
  }
})

const position = reactive({
  top: '',
  left: ''
})
const referenceRef = ref(null)
const targetRef = ref(null)
watch(show, v => {
  if (!v) {
    return
  }
  nextTick(() => {
    switch (props.placement) {
      case BOTTOM_LEFT:
        position.top = `${referenceRef.value.offsetHeight}px`
        position.left = `${-targetRef.value.offsetWidth}px`
        // console.log(position);
        break;
      case BOTTOM_RIGHT:
        position.top = `${referenceRef.value.offsetHeight}px`
        position.left = `${referenceRef.value.offsetWidth}px`
        break;
      case TOP_LEFT:
        position.top = `0px`
        position.left = `${-targetRef.value.offsetWidth}px`
        break;
      case TOP_RIGHT:
        position.top = `0px`
        position.left = `${referenceRef.value.offsetWidth}px`
        break;
    }
  })
})


</script>

<style lang='scss' scoped>
.fade-enter-from,
.fade-leave-to {
  transform: translateY(20px);
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease-in-out;
}
</style>
