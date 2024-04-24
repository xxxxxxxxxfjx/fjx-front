<template>
  <div>
    <slot />
    <div ref="targetRef" class="h-6 py-4">
      <fjx-svg-icon v-show="loading" name="infinite-load" class=" h-4 w-4 mx-auto animate-spin"></fjx-svg-icon>
      <p v-if="isFinished" class="text-center text-base text-zinc-400">已经没有更多数据了!</p>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useIntersectionObserver } from "@vueuse/core"
const props = defineProps({
  isFinished: {
    type: Boolean,
    default: true
  }
})
const loading = defineModel()
const emits = defineEmits(['update:modelValue', 'onLoading'])

const targetRef = ref(null)
const isIntersectingRef = ref(false)
useIntersectionObserver(targetRef,
  ([{ isIntersecting }]) => {
    isIntersectingRef.value = isIntersecting
    onEmit()
  },)

const onEmit = () => {
  setTimeout(() => {
    if (isIntersectingRef.value && !props.modelValue && !props.isFinished) {
      loading.value = true
      emits('onLoading')
    }
  }, 100)
}

watch(loading, () => {
  onEmit()
})


</script>

<style lang='scss' scoped></style>
