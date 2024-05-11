<template>
  <div>
    <div>
      <div class="flex items-center text-xs text-zinc-500 mb-1">
        <span>最近搜索</span>
        <fjx-svg-icon name="delete"
          class="w-2.5 h-2.5 ml-1 p-0.5 rounded-sm duration-200 cursor-pointer hover:bg-zinc-100"
          fillClass="fill-zinc-500"></fjx-svg-icon>
      </div>
    </div>
    <div class="flex flex-wrap">
      <div class="flex items-center p-1 mr-1 text-sm text-zinc-900 rounded-sm bg-zinc-100 font-bold cursor-pointer"
        v-for="(item, index) in historyStore.history" :key="item">
        <span>{{ item }}</span>
        <fjx-svg-icon name="input-delete"
          class="w-2.5 h-2.5 p-0.5 ml-1 duration-300 rounded-sm hover:bg-zinc-100"></fjx-svg-icon>
      </div>
    </div>
  </div>
</template>

<script setup>
import { } from 'vue'
import { useHistoryStore } from "@/stores/history.js"

const historyStore = useHistoryStore()

</script>

<style lang='scss' scoped></style>
