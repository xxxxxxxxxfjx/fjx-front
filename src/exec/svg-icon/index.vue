<template>
  <svg aria-hidden="true">
    <use :xlink:href="iconName" :fill="color" :class="fillClass"></use>
  </svg>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({
  name: {
    type: String,
    required: true
  },
  // 颜色
  color: {
    type: String,
  },
  // tailwindcss 类名样式填充
  fillClass: {
    type: String,
  }
})

const iconName = computed(() => `#icon-${props.name}`)

</script>

<style lang='scss' scoped></style>
