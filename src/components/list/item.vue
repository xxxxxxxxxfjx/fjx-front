<template>
  <div class="bg-white rounded dark:bg-zinc-900 pb-1 xl:dark:bg-zinc-800" :style="{ width: columnWidth + 'px' }">
    <div class="w-full relative rounded cursor-zoom-in group duration-200" :style="{ backgroundColor: color() }">
      <img v-lazy :src="data.photo" class="w-full  rounded bg-transparent "
        :style="{ height: (columnWidth / data.photoWidth) * data.photoHeight + 'px' }">
      <div
        class=" hidden w-full h-full rounded absolute bg-zinc-900/50 top-0 left-0 opacity-0 group-hover:opacity-100 xl:block">
        <fjx-button class="absolute top-1.5 left-1.5  bg-red-500 text-zinc-100">分享</fjx-button>
        <fjx-button type="info" class=" absolute top-1.5 right-1.5" icon="heart"
          iconClass="fill-zinc-900 dark:fill-zinc-200"></fjx-button>
        <fjx-button type="info" size="small" class=" bg-zinc-100/70 absolute bottom-1.5 left-1.5" icon="download"
          iconClass="fill-zinc-900 dark:fill-zinc-200"></fjx-button>
        <fjx-button type="info" size="small" class=" bg-zinc-100/70 absolute bottom-1.5 right-1.5" icon="full"
          iconClass="fill-zinc-900 dark:fill-zinc-200"></fjx-button>
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
import { } from 'vue'
import { color } from "@/utils/color"

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
</script>

<style lang='scss' scoped></style>
