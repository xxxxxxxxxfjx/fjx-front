<template>
  <fjx-search class="mr-2" v-model="inputValue">
    <template #dropdown>
      <div>
        <hint-vue v-show="inputValue" :searchText="inputValue" @handleClick="onSearchHandler"></hint-vue>
      </div>
    </template>
  </fjx-search>
</template>

<script setup>
import { ref } from 'vue'
import HintVue from './hint.vue'
const inputValue = ref("")


const onSearchHandler = (val) => {
  inputValue.value = val
}

</script>

<style lang='scss' scoped></style>
