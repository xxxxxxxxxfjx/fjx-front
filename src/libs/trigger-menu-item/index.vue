<template>
  <div class="flex flex-col items-center justify-center mx-1" @click="handleClick">
    <fjx-svg-icon :name="icon" :class="iconClass"></fjx-svg-icon>
    <p class=" text-sm" :class="textClass">
      <slot></slot>
    </p>
  </div>
</template>

<script setup>
import { } from 'vue'
import { useRouter } from 'vue-router'
const props = defineProps({
  icon: {
    type: String,
    required: true
  },
  iconClass: {
    type: String,
  },
  textClass: {
    type: String,
    default: 'text-zinc-900 dark:text-zinc-100'
  },
  to: {
    type: String,
  }
})

const router = useRouter()
const handleClick = () => {
  if (!props.to) {
    return
  }
  router.push(props.to)
}
</script>

<style lang='scss' scoped></style>
