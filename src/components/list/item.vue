<template>
  <div class="bg-white rounded dark:bg-zinc-900 pb-1 xl:dark:bg-zinc-800" :style="{ width: columnWidth + 'px' }">
    <div class="w-full relative rounded cursor-zoom-in group duration-200" :style="{ backgroundColor: randomRGB() }"
      @click="onClickHandler">
      <img v-lazy ref="imgRef" :src="data.photo" class="w-full  rounded bg-transparent "
        :style="{ height: (columnWidth / data.photoWidth) * data.photoHeight + 'px' }">
      <!-- 蒙版 -->
      <div
        class=" hidden w-full h-full rounded absolute bg-zinc-900/50 top-0 left-0 opacity-0 group-hover:opacity-100 xl:block">
        <!-- 分享 -->
        <fjx-button class="absolute top-1.5 left-1.5  bg-red-500 text-zinc-100">分享</fjx-button>
        <!-- 点赞 -->
        <fjx-button type="info" class=" absolute top-1.5 right-1.5" icon="heart"
          iconClass="fill-zinc-900 dark:fill-zinc-200"></fjx-button>
        <!-- 下载 -->
        <fjx-button type="info" size="small" class=" bg-zinc-100/70 absolute bottom-1.5 left-1.5" icon="download"
          iconClass="fill-zinc-900 dark:fill-zinc-200" @click="onDownloadHandler"></fjx-button>
        <!-- 全屏 -->
        <fjx-button type="info" size="small" class=" bg-zinc-100/70 absolute bottom-1.5 right-1.5" icon="full"
          iconClass="fill-zinc-900 dark:fill-zinc-200" @click="enter"></fjx-button>
      </div>
    </div>
    <p class="text-sm font-bold mt-1 px-1 text-zinc-900 dark:text-zinc-300 line-clamp-2">{{ data.title }}</p>
    <div class="mt-1 px-1 flex items-center">
      <img v-lazy class="w-2 h-2  rounded-full" :src="data.avatar">
      <span class="ml-1 text-sm text-zinc-500">{{ data.author }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { randomRGB } from "@/utils/color"
import { saveAs } from 'file-saver'
import { message } from '@/libs';
import { useFullscreen, useElementBounding } from '@vueuse/core'

const props = defineProps({
  data: {
    type: Object,
    required: true
  },
  columnWidth: {
    type: Number,
    default: 200
  }
})

const emits = defineEmits(['click'])


// 下载功能
const onDownloadHandler = () => {
  // 提示消息
  message('success', '图片开始下载')
  setTimeout(() => {
    saveAs(props.data.photo, props.data.title)
  }, 100)
}

const imgRef = ref(null)
const { enter } = useFullscreen(imgRef)

// 解构响应式数据
const { x: left, y: top, width, height } = useElementBounding(imgRef)
// 计算图片的中心位置
const container = computed(() => ({
  translateX: width.value / 2 + left.value,
  translateY: height.value / 2 + top.value
}))

// 点击查看：url改变+组件切换
const onClickHandler = () => {
  emits('click', { id: props.data.id, location: container.value })
  // history.pushState({}, '', `/photo/${props.data.id}`)
}

</script>

<style lang='scss' scoped></style>
