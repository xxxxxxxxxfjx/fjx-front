<template>
  <div>
    <!-- 背景蒙版 -->
    <transition name="fade">
      <div v-if="visiable" class=" w-screen h-screen fixed top-0 left-0 z-40 bg-zinc-900/80" @click="close"></div>
    </transition>
    <!-- confirm内容 -->
    <transition name="up">
      <div v-if="visiable"
        class="w-[80%] fixed z-50 top-1/3 left-[50%] translate-x-[-50%] border cursor-pointer px-2 py-1.5 rounded-sm dark:border-zinc-600 bg-white dark:bg-zinc-800 xl:w-[35%]">
        <div class=" text-lg font-bold mb-2 text-zinc-900 dark:text-zinc-200">
          {{ title }}
        </div>
        <div class="text-base text-zinc-900 dark:text-zinc-200 mb-2">
          {{ content }}
        </div>
        <div class="flex justify-end">
          <fjx-button type="info" class="mr-2" @click="onCancelClick">{{ cancelText }}</fjx-button>
          <fjx-button type="primary" @click="onConfirmClick">{{ confirmText }}</fjx-button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import fjxButton from '@/libs/button/index.vue'

const props = defineProps({
  // 标题
  title: {
    type: String
  },
  // 内容
  content: {
    type: String,
    required: true
  },
  // 取消文本
  cancelText: {
    type: String,
    default: '取消'
  },
  // 确认文本
  confirmText: {
    type: String,
    default: '确认'
  },
  // 取消前的回调函数
  cancelHandler: {
    type: Function
  },
  // 确认前的回调函数
  confirmHandler: {
    type: Function
  },
  // 关闭前的回调函数
  close: {
    type: Function
  }
})

const visiable = ref(false)

// 展示遮罩层
const show = () => {
  visiable.value = true
}

onMounted(() => {
  show()
})
const duration = '0.5s'

// 点击遮罩层关闭弹窗
const close = () => {
  visiable.value = false
  setTimeout(() => {
    if (props.close) {
      props.close()
    }
  }, parseInt(duration.replace('0.', '').replace('s', '')) * 100)
}

// 点击确认按钮，触发事件
const onConfirmClick = () => {
  if (props.confirmHandler) {
    props.confirmHandler()
  }
  close()
}
// 点击取消按钮，触发事件
const onCancelClick = () => {
  if (props.cancelHandler) {
    props.cancelHandler()
  }
  close()
}

</script>

<style lang='scss' scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all v-bind(duration);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.up-enter-active,
.up-leave-active {
  transition: all v-bind(duration);
}

.up-enter-from,
.up-leave-to {
  opacity: 0;
  transform: translate3d(-50%, 100px, 0);
}
</style>
