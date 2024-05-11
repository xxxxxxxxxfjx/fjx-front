<template>
  <fjx-search class="mr-2" v-model="inputValue">
    <template #dropdown>
      <div>
        <hint-vue v-show="inputValue" :searchText="inputValue" @handleClick="onSearchHandler"></hint-vue>
        <history-vue v-show="!inputValue"></history-vue>
      </div>
    </template>
  </fjx-search>
</template>

<script setup>
import { ref } from 'vue'
import HintVue from './hint.vue'
import HistoryVue from './history.vue'
import { useHistoryStore } from '@/stores/history';

const inputValue = ref("")
const historyStore = useHistoryStore()


const onSearchHandler = (val) => {
  inputValue.value = val
  if (val) {
    historyStore.addHistory(val)
  }
}

</script>

<style lang='scss' scoped></style>
