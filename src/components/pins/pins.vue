<template>
  <div
    class=" fixed top-0 left-0 w-screen h-screen z-60 bg-white dark:bg-zinc-900 xl:bg-transparent backdrop-blur-4xl pb-2 xl:p-2 overflow-y-auto">
    <!-- 移动端navbar -->
    <fjx-navbar v-if="isMobileTerminal" @clickLeft="onPop" @clickRight="onPop">
      {{ data.title }}
      <template #right>
        <fjx-svg-icon name="share" class=" w-3 h-3 " fillClass="fill-zinc-900 dark:fill-zinc-200"></fjx-svg-icon>
      </template>
    </fjx-navbar>
    <!-- pc端关闭按钮 -->
    <fjx-svg-icon v-else @click="handleClose" class=" w-2 h-2 cursor-pointer absolute top-2 right-2" name="close"
      fillClass="fill-zinc-400"></fjx-svg-icon>
    <!-- 内容 -->
    <div v-if="data.title" class="w-full xl:w-[80%] xl:h-full xl:mx-auto xl:flex">
      <img class="w-full xl:w-3/5 xl:h-full xl:rounded-tl-lg xl:rounded-bl-lg mb-2 bg-transparent" :src="data?.photo">
      <div class="w-full xl:h-full  xl:w-2/5 xl:rounded-tr-lg xl:rounded-br-lg bg-white dark:bg-zinc-900 xl:p-3">
        <!-- pc端下的分享和收藏 -->
        <div v-if="!isMobileTerminal" class="w-full flex justify-between items-center mb-2">
          <fjx-svg-icon name="share"
            class="w-4 h-4 p-1 cursor-pointer  rounded-sm duration-200 hover:bg-zinc-200 dark:hover:bg-zinc-800"
            fillClass="fill-zinc-900 dark:fill-zinc-200"></fjx-svg-icon>
          <fjx-button type="info" icon="heart"></fjx-button>
        </div>
        <p class=" text-base xl:text-xl font-bold pl-1 mb-1 xl:mb-2 text-zinc-950 dark:text-zinc-50">{{ data.title }}
        </p>
        <div class="flex items-center">
          <img v-lazy :src="data.avatar" class="w-3 h-3 ml-1 rounded-full xl:w-4 xl:h-4">
          <span class="text-base ml-1 text-zinc-900 dark:text-zinc-200">{{ data.author }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { isMobileTerminal } from "@/utils/flexiable"
import { getPexelsById } from "@/services/modules/pexels"
import { randomRGB } from '@/utils/color';
import { useRouter } from 'vue-router';
import { useAppStore } from "@/stores/app"

const appStore = useAppStore()

const emits = defineEmits('close')
const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const data = ref({})
const getData = async () => {
  const res = await getPexelsById(props.id)
  data.value = res
  console.log(res);
}
getData()

// 关闭组件，并路由返回
const router = useRouter()
const handleClose = () => {
  // 移动端下router跳转类型
  appStore.setRouterType('back')
  router.back()
}
// 移动端触发事件
const onPop = () => {
  // 移动端下router跳转类型
  appStore.setRouterType('back')
  router.back()
}
</script>

<style lang='scss' scoped></style>
