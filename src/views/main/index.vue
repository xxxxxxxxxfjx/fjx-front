<template>
  <div class="home">
    <mobile-vue v-if="isMobileTerminal" v-model="data"></mobile-vue>
    <pc-vue v-else v-model="data"></pc-vue>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { isMobileTerminal } from "@/utils/flexiable"
import { useCategoryStore } from "@/stores/category"
import MobileVue from "./cpns/mobile/index.vue"
import PcVue from "./cpns/pc/index.vue"


console.log(isMobileTerminal.value);

const data = ref([])
const categoryStore = useCategoryStore()
const getCategoryData = async () => {
  data.value = await categoryStore.getCategoryApi()
}
getCategoryData()
</script>

<style lang='scss' scoped></style>
