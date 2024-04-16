<template>
  <div class="home">
    <mobile-vue v-if="isMobileTerminal" v-model="data"></mobile-vue>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ALL_CATEGORY } from "@/constants"
import { isMobileTerminal } from "@/utils/flexiable"
import { useCategoryStore } from "@/stores/category"
import MobileVue from "./mobile/index.vue"

const data = ref([])
const categoryStore = useCategoryStore()
const getCategoryData = async () => {
  data.value = await categoryStore.getCategoryApi()
  data.value.unshift(ALL_CATEGORY)
}
getCategoryData()
</script>

<style lang='scss' scoped></style>
