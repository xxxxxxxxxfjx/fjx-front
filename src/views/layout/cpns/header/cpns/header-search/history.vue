<template>
  <div>
    <div>
      <div class="flex items-center text-xs text-zinc-500">
        <span>最近搜索</span>
        <fjx-svg-icon name="delete"
          class="w-2.5 h-2.5 ml-1 p-0.5 rounded-sm duration-200 cursor-pointer hover:bg-zinc-100"
          fillClass="fill-zinc-500" @click="onDeleteAllHandler"></fjx-svg-icon>
      </div>
    </div>
    <div class="flex flex-wrap">
      <div
        class="flex items-center px-1 py-0.5 mr-1 mt-1 text-sm text-zinc-900 rounded-sm bg-zinc-100 font-bold cursor-pointer hover:bg-zinc-200"
        v-for="(item, index) in historyStore.history" :key="item">
        <span>{{ item }}</span>
        <fjx-svg-icon name="input-delete" class="w-2.5 h-2.5 p-0.5 ml-1 duration-300 rounded-sm hover:bg-zinc-50 "
          @click="onDeleteOneHandler(item)"></fjx-svg-icon>
      </div>
    </div>
  </div>
</template>

<script setup>
import { } from 'vue'
import { confirm } from '@/libs/confirm';
import { useHistoryStore } from "@/stores/history.js"

const historyStore = useHistoryStore()


// 触发删除所有搜索历史记录
const onDeleteAllHandler = () => {
  confirm("你真的要删除所有搜索历史记录吗？").then(() => {
    historyStore.deleteAllHistory()
  })
}

// 删除单个历史记录
const onDeleteOneHandler = (item) => {
  historyStore.deleteHistory(item)
}

</script>

<style lang='scss' scoped></style>
