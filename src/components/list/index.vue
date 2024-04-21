<template>
  <fjx-waterfall class="w-full  px-1" :data="pexelsList" nodeKey="id" :columns="isMobileTerminal ? 2 : 5"
    :picturePreReading="false">
    <template #default="{ item, width, index }">
      <item-vue :data="item" :columnWidth="width" :index="index" />
    </template>
  </fjx-waterfall>
</template>

<script setup>
import { ref } from 'vue'
import ItemVue from "./item.vue"
import { getPexelsListApi } from "@/services/modules/pexels"
import { isMobileTerminal } from "@/utils/flexiable"

let data = {
  page: 1,
  size: 20
}
const pexelsList = ref([])
const getPexelsList = async () => {
  const res = await getPexelsListApi(data)
  console.log(res);
  pexelsList.value = res.list
}
getPexelsList()
</script>

<style lang='scss' scoped></style>
