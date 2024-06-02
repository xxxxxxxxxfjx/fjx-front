<template>
  <div class="h-5 w-screen fixed bg-zinc-100 border-b border-b-zinc-200 z-50 dark:bg-zinc-900 dark:border-b-zinc-950"
    :class="[sticky ? 'sticky top-0' : 'relative']">
    <!-- 左侧按钮 -->
    <div class=" h-full w-5 absolute left-0 top-0 flex justify-center items-center cursor-pointer" @click="clickLeft">
      <slot name="left">
        <fjx-svg-icon name="back" class=" w-2 h-2" fillClass=" fill-zinc-900 dark:fill-zinc-200"></fjx-svg-icon>
      </slot>
    </div>
    <!-- 显示内容 -->
    <div class=" h-full flex items-center justify-center m-auto text-sm font-bold text-zinc-950 dark:text-zinc-50">
      <slot />
    </div>
    <!-- 右侧按钮 -->
    <div class="h-full w-5 absolute right-0 top-0 flex justify-center items-center" @click="clickRight">
      <slot name="right">
      </slot>
    </div>
  </div>
</template>

<script setup>
import { } from 'vue'
import { useRouter } from "vue-router"

const router = useRouter()

const props = defineProps({
  clickLeft: Function,
  clickRight: Function,
  sticky: Boolean
})

// 点击左侧按钮
const clickLeft = () => {
  if (props.clickLeft) {
    props.clickLeft()
    return
  }
  router.back()
}
// 点击右侧按钮
const clickRight = () => {
  if (props.clickRight) {
    props.clickRight()
  }
}

</script>

<style lang='scss' scoped></style>
