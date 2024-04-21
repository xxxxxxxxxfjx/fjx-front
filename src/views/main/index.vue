<template>
  <div class="home h-full overflow-auto bg-white dark:bg-zinc-800 duration-500">
    <mobile-vue v-if="isMobileTerminal" v-model="data"></mobile-vue>
    <pc-vue v-else v-model="data"></pc-vue>
    <div class="max-w-screen-xl mx-auto realative m-1 xl:mt-4">
      <list-vue></list-vue>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { isMobileTerminal } from "@/utils/flexiable"
import { useCategoryStore } from "@/stores/category"
import MobileVue from "./cpns/mobile/index.vue"
import PcVue from "./cpns/pc/index.vue"
import ListVue from "@/components/list/index.vue"


console.log(isMobileTerminal.value);

const data = ref([])
const categoryStore = useCategoryStore()
const getCategoryData = async () => {
  data.value = await categoryStore.getCategoryApi()
}
getCategoryData()
</script>

<style lang='scss' scoped></style>
