<template>
  <!-- 人类行为验证框 -->
  <div
    class=" w-[340px] h-[270px] rounded fixed top-[20%] left-[50%] translate-x-[-50%] bg-white border border-zinc-300 dark:border-0 dark:bg-zinc-800">
    <!-- 头部 -->
    <div class=" w-auto p-1 flex items-center">
      <span class=" flex-grow text-sm text-zinc-900 dark:text-zinc-200">请完成安全验证</span>
      <fjx-svg-icon name="refresh" class=" cursor-pointer w-2 h-2" fillClass="fill-zinc-900 dark:fill-zinc-200"
        :class="{ ' animate-spin': isClick }" @click="handleRefresh"></fjx-svg-icon>
      <fjx-svg-icon name="close" class="ml-2 cursor-pointer w-2 h-2" fillClass="fill-zinc-900 dark:fill-zinc-200"
        @click="handleClose"></fjx-svg-icon>
    </div>
    <!-- slider-captcha -->
    <div id="slider-captcha" class=" text-base"></div>
  </div>
</template>


<script setup>
import { onMounted, ref } from 'vue'
import "@/vendor/SliderCaptcha/longbow.slidercaptcha.min.js"
import "@/vendor/SliderCaptcha/slidercaptcha.min.css"


const emits = defineEmits(['close', 'success', 'failed'])

let captcha = null
onMounted(() => {
  // 未做服务端人类行为验证，未获得记录拖拽的路径arr
  captcha = sliderCaptcha({
    id: 'slider-captcha',
    loadingText: '正在加载中...',
    failedText: '再试一次',
    barText: '向右滑动填充拼图',
    setSrc: function () {
      return "https://picsum.photos/300/200"
    },
    onSuccess: function () {
      emits('success')
    },
    onFail: function () {
      emits('failed')
    },
  })
})

const isClick = ref(false)
// 人类行为验证刷新
const handleRefresh = () => {
  isClick.value = true
  captcha.reset()
  setTimeout(() => {
    isClick.value = false
  }, 1000)
}

// 关闭人类行为验证
const handleClose = () => {
  emits('close')
}

</script>

<style lang='scss' scoped></style>
