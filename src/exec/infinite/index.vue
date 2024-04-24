<template>
  <div>
    <slot />
    <div ref="tergetRef" class="h-6 py-4">
      <e-svg-icon v-show="loading" name="infinite-load" class="w-4 h-4 animate-spin mx-auto"></e-svg-icon>
      <p v-if="isFinished" class="text-base text-zinc-400 text-center">已经没有更多数据了!</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
const loading = defineModel()
const props = defineProps({
  isFinished: {
    type: Boolean,
    default: false
  }
})
const emits = defineEmits(['onLoading'])

const tergetRef = ref(null)
const isIntersectingRef = ref(false)

const onEmit = () => {
  setTimeout(() => {
    if (isIntersectingRef.value && !loading.value && !props.isFinished) {
      loading.value = true
      emits('onLoading')
    }
  }, 100)
}
onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    let { isIntersecting } = entries[0]
    isIntersectingRef.value = isIntersecting
    onEmit()
  })
  observer.observe(tergetRef.value)
})
watch(loading, onEmit)

</script>

<style lang='scss' scoped></style>
