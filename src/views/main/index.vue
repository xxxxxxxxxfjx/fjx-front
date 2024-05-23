<template>
  <div
    class="h-full overflow-auto bg-white dark:bg-zinc-800 duration-500 scrollbar-thin scrollbar-thumb-transparent xl:scrollbar-thumb-zinc-200 xl:dark:scrollbar-thumb-zinc-900 scrollbar-track-transparent">
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
import { useAppStore } from "@/stores/app"
import MobileVue from "./cpns/mobile/index.vue"
import PcVue from "./cpns/pc/index.vue"
import ListVue from "@/components/list/index.vue"


console.log(isMobileTerminal.value);

const data = ref([])
const appStore = useAppStore()
const getCategoryData = async () => {
  data.value = await appStore.getCategoryApi()
}
getCategoryData()
</script>

<style lang='scss' scoped></style>
