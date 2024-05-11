<template>
  <fjx-search ref="searchRef" class="mr-2" v-model="inputValue" @search="onSearchHandler">
    <template #dropdown>
      <div>
        <!-- 搜索提示 -->
        <hint-vue v-show="inputValue" :searchText="inputValue" @handleClick="onSearchHandler"></hint-vue>
        <!-- 搜索历史 -->
        <history-vue v-show="!inputValue" @select="onSearchHandler"></history-vue>
        <!-- 推荐主题 -->
        <theme-vue v-show="!inputValue" @select="onSearchHandler"></theme-vue>
      </div>
    </template>
  </fjx-search>
</template>

<script setup>
import { ref, nextTick } from 'vue'
import HintVue from './hint.vue'
import HistoryVue from './history.vue'
import ThemeVue from "./theme.vue"
import { useHistoryStore } from '@/stores/history';
import { useAppStore } from '@/stores/app';
// searchBar的DOM
const searchRef = ref(null)
// 搜索词
const inputValue = ref("")

const historyStore = useHistoryStore()
const appStore = useAppStore()

// 搜索事件
const onSearchHandler = (val) => {
  inputValue.value = val
  // 关闭搜索提示hint
  searchRef.value.closeDropDown()
  if (val) {
    historyStore.addHistory(val)
    appStore.setSearchText(val)
  }

}

</script>

<style lang='scss' scoped></style>
