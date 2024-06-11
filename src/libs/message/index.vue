<template>
  <transition name="fade">
    <div v-if="visiable"
      class=" min-w-[300px] fixed z-50 top-[50px] left-[50%] translate-x-[-50%] border rounded-sm flex items-center px-2 py-1 cursor-pointer"
      :class="styles[type].containerClass">
      <fjx-svg-icon :name="styles[type].icon" :fillClass="styles[type].fillClass"
        class="w-1.5 h-1.5 mr-1"></fjx-svg-icon>
      <span class="text-sm" :class="styles[type].textClass">{{ content }}</span>
    </div>
  </transition>
</template>

<script>
// type类型
const SUCCESS = "success"
const WARN = 'warn'
const ERROR = 'error'
const typeEnum = [SUCCESS, WARN, ERROR]
</script>

<script setup>
import { ref, onMounted, defineAsyncComponent } from 'vue'
// import fjxSvgIcon from '@/libs/svg-icon/index.vue'


const fjxSvgIcon = defineAsyncComponent(() => import("@/libs/svg-icon/index.vue"))

const props = defineProps({
  // 弹窗类型
  type: {
    type: String,
    required: true,
    validator: (val) => {
      const res = typeEnum.includes(val)
      if (!res) {
        throw new Error(`type 必须是 ${typeEnum.join('、')}中的一个`)
      }
      return res
    }
  },
  // 弹窗类容
  content: {
    type: String,
    required: true,
  },
  // 弹窗显示时间
  duration: {
    type: Number,
  },
  // 关闭前的回调函数
  close: {
    type: Function
  }
})

// 弹窗样式
const styles = {
  // warn样式
  warn: {
    icon: 'warn',
    fillClass: "fill-warn-300",
    textClass: "text-warn-300",
    containerClass: "bg-warn-100 border-warn-200 hover:shadow-lg hover:shadow-warn-200"
  },
  // error样式
  error: {
    icon: 'error',
    fillClass: "fill-error-300",
    textClass: "text-error-300",
    containerClass: "bg-error-100 border-error-200 hover:shadow-lg hover:shadow-error-200"
  },
  // success样式
  success: {
    icon: 'success',
    fillClass: "fill-success-300",
    textClass: "text-success-300",
    containerClass: "bg-success-100 border-success-200 hover:shadow-lg hover:shadow-success-200"
  }
}

const animationDuration = '0.5s'

// 控制显示
const visiable = ref(false)
onMounted(() => {
  visiable.value = true
  setTimeout(() => {
    visiable.value = false
    setTimeout(() => {
      props.close && props.close()
    }, parseInt(animationDuration.replace('0.', '').replace('s', '')) * 100)
  }, props.duration)
})
</script>

<style lang='scss' scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all v-bind(animationDuration);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translate3d(-50%, -100px, 0);
}
</style>
