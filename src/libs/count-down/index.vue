<template>
  <div class=" ">
    <slot>
      <p class="text-sm">{{ showTime }}</p>
    </slot>
  </div>
</template>


<script>
const EMITS_FINISH = 'finish'
const EMITS_CHANGE = 'change'

const INTERVAL_TIME = 1000
</script>

<script setup>
import dayjs from './utils.js'
import { watch, ref, computed, onUnmounted } from 'vue'


const emits = defineEmits([EMITS_FINISH, EMITS_CHANGE])
const props = defineProps({
  time: {
    type: Number,
    required: true
  },
  format: {
    type: String,
    default: 'HH:mm:ss'
  }
})

// 开始
let interval
const start = () => {
  close()
  interval = setInterval(() => {
    durationFn()
  }, INTERVAL_TIME)
}
// 持续
const duration = ref(0)
const durationFn = () => {
  duration.value -= INTERVAL_TIME
  emits(EMITS_CHANGE)
  if (duration.value <= 0) {
    duration.value = 0
    close()
    emits(EMITS_FINISH)
  }
}
// 结束
const close = () => {
  if (interval) {
    clearInterval(interval)
  }
}
watch(() => props.time, (val) => {
  duration.value = val
  start()
}, { immediate: true })


const showTime = computed(() => {
  return dayjs.duration(duration.value).format(props.format)
})

// 组件卸载停止倒计时
onUnmounted(() => {
  close()
})
</script>

<style lang='scss' scoped></style>
