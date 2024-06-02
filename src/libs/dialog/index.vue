<template>
  <div class=" relative w-screen h-screen overflow-hidden" v-if="isVisiable">
    <!-- 背景 -->
    <transition name="fade">
      <div class=" w-full h-full  bg-zinc-900/80 z-40 fixed top-0 left-0" @click="close"></div>
    </transition>
    <!-- 内容 -->
    <transition name="up">
      <div
        class="px-2 py-1.5 max-w-[80%] max-h-[80%] overflow-auto fixed z-50 top-[10%] left-[50%] translate-x-[-50%] rounded-sm border dark:border-zinc-400 bg-white dark:bg-zinc-800 cursor-pointer xl:min-w-[35%]">
        <!-- title -->
        <div v-if="title" class="text-lg font-bold text-zinc-900 dark:text-zinc-200 mb-2">{{ title }}</div>
        <!-- 内容 -->
        <div class=" text-base text-zinc-900 dark:text-zinc-200 mb-2">
          <slot />
        </div>
        <!-- 按钮 -->
        <div v-if="cancelHandler || confirmHandler" class=" flex justify-end">
          <fjx-button type="info" class="mr-2" @click="onClickCancel">{{ cancelText }}</fjx-button>
          <fjx-button type="primary" @click="onClickConfirm">{{ confirmText }}</fjx-button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { } from 'vue'

// 控制开关
const isVisiable = defineModel({ required: true, default: false, type: Boolean })
const props = defineProps({
  // 标题
  title: {
    type: String
  },
  // 取消按钮文本
  cancelText: {
    type: String,
    default: '取消'
  },
  // 确认按钮文本
  confirmText: {
    type: String,
    default: '确认'
  },
  // 取消按钮点击事件
  cancelHandler: {
    type: Function
  },
  // 确定按钮点击事件
  confirmHandler: {
    type: Function
  },
  // 关闭的回调
  close: {
    type: Function
  }
})


// 点击确认
const onClickConfirm = () => {
  if (props.confirmHandler) {
    props.confirmHandler()
  }
  close()
}

// 点击取消
const onClickCancel = () => {
  if (props.cancelHandler) {
    props.cancelHandler()
  }
  close()
}

// 关闭
const close = () => {
  isVisiable.value = false
  if (props.close) {
    props.close()
  }
}

</script>

<style lang='scss' scoped>
.fade-enter-active {
  transition: all 0.3s;
}

.fade-leave-active {
  transition: all 0.8s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.popup-enter-active {
  transition: all 0.3s;
}

.popup-leave-active {
  transition: all 0.8s;
}

.popup-enter-from,
.popup-leave-to {
  transform: translateY(100%);
}
</style>
