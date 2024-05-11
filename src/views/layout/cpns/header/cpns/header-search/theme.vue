<template>
  <div class="mt-1">
    <div class="flex items-center text-xs text-zinc-500 mb-1">热门精选</div>
    <div class="flex h-[140px]" v-if="themeData.list.length">
      <div class=" group/big h-full w-[260px] relative cursor-pointer rounded" :style="{ backgroundColor: randomRGB() }"
        @click="onClickHanlder(themeData.big)">
        <img class="w-full h-full object-cover rounded" :src="themeData.big.photo" alt="">
        <p
          class="absolute bottom-0 left-0 h-[45%] w-full text-zinc-100 duration-300 rounded text-xs p-1 flex items-center backdrop-blur group-hover/big:backdrop-blur-none">
          #
          {{
      themeData.big.title }}</p>
      </div>
      <div class="flex-1 flex flex-wrap max-w-[860px]">
        <div class=" group/small h-[45%] w-[260px] relative cursor-pointer ml-1.5 mb-1.5 rounded"
          :style="{ backgroundColor: randomRGB() }" v-for="(item, index) in themeData.list"
          @click="onClickHanlder(item)">
          <img class="w-full h-full object-cover rounded" :src="item.photo">
          <p
            class="absolute bottom-0 left-0 h-full w-full text-zinc-100 duration-300 rounded text-xs p-1 flex items-center backdrop-blur group-hover/small:backdrop-blur-none">
            #
            {{
      item.title }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const EMIT_SELECT = 'select'
</script>

<script setup>
import { ref } from 'vue'
import { randomRGB } from "@/utils/color"
import { getPexelsTheme } from '@/services/modules/pexels'

const emits = defineEmits([EMIT_SELECT])

const themeData = ref({
  big: {},
  list: []
})
const getThemeData = async () => {
  const { themes } = await getPexelsTheme()
  themeData.value = {
    big: themes[0],
    list: themes.slice(1)
  }
}
getThemeData()

// 处理点击推荐主题事件
const onClickHanlder = (item) => {
  console.log(item);
  emits(EMIT_SELECT, item.id)
}
</script>

<style lang='scss' scoped></style>
