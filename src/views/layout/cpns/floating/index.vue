<template>
  <div class=" fixed z-50 bottom-12 right-5">
    <!-- 引导 -->
    <div @click="onGuideClick"
      class="guide-start w-4 h-4 border rounded-full bg-white duration-200 group dark:bg-zinc-900 border-zinc-300 dark:border-0 mb-1 flex items-center cursor-pointer justify-center hover:shadow-lg">
      <fjx-svg-icon name="guide" class="w-2 h-2"
        fillClass="fill-zinc-900 dark:fill-zinc-200 group-hover:fill-hover-main"></fjx-svg-icon>
    </div>
    <!-- 反馈 -->
    <fjx-popover :placement="'top-left'" class="guide-feedback">
      <template #reference>
        <div class=" w-4 h-4 border bg-white dark:bg-zinc-900 group rounded-full border-zinc-300 dark:border-0 flex
          items-center justify-center cursor-pointer">
          <fjx-svg-icon name="feedback" class="w-2 h-2"
            fillClass="fill-zinc-900 dark:fill-zinc-200 group-hover:fill-hover-main"></fjx-svg-icon>
        </div>
      </template>
      <!-- 返回内容 -->
      <div class=" w-[150px] p-0.5 cursor-pointer bg-white duration-200   dark:bg-zinc-900">
        <div @click="onFeedbackClick"
          class="flex items-center p-1 bg-white hover:bg-zinc-100 rounded-sm duration-200  dark:bg-zinc-900 dark:hover:bg-zinc-700">
          <fjx-svg-icon name="feedback" class="w-1.5 h-1.5 mr-1"
            fillClass="fill-zinc-900 dark:fill-zinc-200"></fjx-svg-icon>
          <span class="text-sm text-zinc-900 dark:text-zinc-100">立即吐槽</span>
        </div>
      </div>
    </fjx-popover>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import Driver from 'driver.js';
import "driver.js/dist/driver.min.css";
import steps from './steps';

let driver = null
onMounted(() => {
  driver = new Driver({
    // 禁止点击蒙版关闭
    allowClose: false,
    closeBtnText: '关闭',
    nextBtnText: '下一个',
    prevBtnText: '上一个'
  })
})
/**
 * 开始引导
 */
const onGuideClick = () => {
  driver.defineSteps(steps)
  driver.start()
}

// 处理用户反馈问题
const onFeedbackClick = () => {
  console.log(import.meta.env.VITE_FEEDBACK_URL);
  window.open(import.meta.env.VITE_FEEDBACK_URL, '_blank')

}

</script>

<style lang='scss' scoped>
.driver-fix-stacking {
  position: fixed;
  z-index: 100004 !important;
}
</style>
