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
import { ref, toRefs } from 'vue'
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
useIntersectionObserver(targetRef,
  ([{ isIntersecting }]) => {
    if (isIntersecting && !props.modelValue && !props.isFinished) {
      loading.value = true
      emits('onLoading')
    }
  },)

</script>

<style lang='scss' scoped></style>
