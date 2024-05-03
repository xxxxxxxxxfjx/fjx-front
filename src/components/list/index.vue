<template>
  <!-- <fjx-waterfall class="w-full  px-1" :data="pexelsList" nodeKey="id" :columns="isMobileTerminal ? 2 : 5"
    :picturePreReading="false">
    <template #default="{ item, width, index }">
      <item-vue :data="item" :columnWidth="width" :index="index" />
    </template>
</fjx-waterfall> -->
  <!-- <fjx-infinite v-model="loading" :isFinished="isFinished" @onLoading="getPexelsList">
    <e-waterfall class="w-full  px-1" :data="pexelsList" nodeKey="id" :columns="isMobileTerminal ? 2 : 5"
      :picturePreReading="false">

      <template #default="{ item, width, index }">
        <item-vue :data="item" :columnWidth="width" :index="index" />
      </template>
    </e-waterfall>
  </fjx-infinite> -->
  <e-infinite v-model="loading" :isFinished="isFinished" @onLoading="getPexelsList">
    <e-waterfall class="w-full  px-1" :data="pexelsList" nodeKey="id" :columns="isMobileTerminal ? 2 : 5"
      :picturePreReading="false">

      <template #default="{ item, width, index }">
        <item-vue :data="item" :columnWidth="width" :index="index" />
      </template>
    </e-waterfall>
  </e-infinite>
</template>

<script setup>
import { ref, watch } from 'vue'
import ItemVue from "./item.vue"
import { getPexelsListApi } from "@/services/modules/pexels"
import { isMobileTerminal } from "@/utils/flexiable"
import { useCategoryStore } from '@/stores/category';

const categoryStore = useCategoryStore();

let data = {
  page: 1,
  size: 20
}
const loading = ref(false)
const isFinished = ref(false)
const pexelsList = ref([])
const getPexelsList = async () => {
  if (isFinished.value) {
    return
  }

  if (pexelsList.value.length) {
    data.page++
  }
  const res = await getPexelsListApi(data)
  // console.log(res);

  if (data.page === 1) {
    pexelsList.value = res.list
  } else {
    pexelsList.value.push(...res.list)
  }
  if (pexelsList.value.length === res.total) {
    isFinished.value = true
  }
  loading.value = false
}

const resetQuery = (newRequery) => {
  data = {
    ...data,
    ...newRequery
  }
  pexelsList.value = []
  isFinished.value = false
}

watch(() => categoryStore.currentCategory, (currentCategory) => {
  resetQuery({
    page: 1,
    categoryId: currentCategory.id
  })
})
</script>

<style lang='scss' scoped></style>
