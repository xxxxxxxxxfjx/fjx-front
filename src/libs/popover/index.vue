<template>
  <div class=" relative" @mouseleave="handleMouseLeave" @mouseenter="handleMouseEnter">
    <div ref="referenceRef">
      <slot name="reference" />
    </div>
    <transition name="fade">
      <div ref="targetRef" v-show="isVisiable" class="absolute p-1 z-20 bg-white border rounded-md" :style="position">
        <slot />
      </div>
    </transition>
  </div>
</template>

<script>
const TOP_LEFT = 'top-left'
const TOP_RIGHT = 'top-right'
const BOTTOM_LEFT = 'bottom-left'
const BOTTOM_RIGHT = 'bottom-right'
const placementEnum = [TOP_LEFT, TOP_RIGHT, BOTTOM_LEFT, BOTTOM_RIGHT]

</script>

<script setup>
import { ref, watch, nextTick } from 'vue'
import { useElementSize } from '@vueuse/core'
import { TIMEOUT } from '@/constants'

const referenceRef = ref(null)
const targetRef = ref(null)
const isVisiable = ref(false)

let timer = null
const handleMouseLeave = () => {
  timer = setTimeout(() => {
    isVisiable.value = false
    timer = null
  }, TIMEOUT)
}
const handleMouseEnter = () => {
  isVisiable.value = true
  if (timer) {
    clearTimeout(timer)
  }
}

const props = defineProps({
  placement: {
    type: String,
    default: 'bottom-left',
    validator(value) {
      const has = placementEnum.includes(value)
      if (!has) {
        throw new Error(`placement 必须是 ${placementEnum.join('、')} 中的一个`)
      }
      return has
    }
  }
})

const position = ref({
  top: 0,
  left: 0
})
watch(isVisiable, v => {
  if (!v) return
  nextTick(() => {
    const { width: targetWidth, height: targetHeight } = useElementSize(targetRef)
    const { width: referenceWidth, height: referenceHeight } = useElementSize(referenceRef)
    switch (props.placement) {
      case TOP_LEFT:
        position.value.top = 0
        position.value.left = `${-targetWidth.value}px`
        break
      case TOP_RIGHT:
        position.value.top = 0
        position.value.left = `${referenceWidth.value}px`
        break;
      case BOTTOM_LEFT:
        position.value.top = `${referenceHeight.value}px`
        position.value.left = `${-targetWidth.value}px`
        // console.log(position.value);
        break;
      case BOTTOM_RIGHT:
        position.value.top = `${referenceHeight.value}px`
        position.value.left = `${referenceWidth.value}px`
        break;
    }
  })
})


</script>

<style lang='scss' scoped>
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease-in-out;
}
</style>
