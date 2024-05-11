<template>
  <fjx-search ref="searchRef" class="mr-2" v-model="inputValue" @search="onSearchHandler">
    <template #dropdown>
      <div>
        <hint-vue v-show="inputValue" :searchText="inputValue" @handleClick="onSearchHandler"></hint-vue>
        <history-vue v-show="!inputValue"></history-vue>
        <theme-vue v-show="!inputValue"></theme-vue>
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

const searchRef = ref(null)

const inputValue = ref("")
const historyStore = useHistoryStore()


const onSearchHandler = (val) => {
  inputValue.value = val
  if (val) {
    historyStore.addHistory(val)
  }
  nextTick(searchRef.value.closeDropDown())
}

</script>

<style lang='scss' scoped></style>
