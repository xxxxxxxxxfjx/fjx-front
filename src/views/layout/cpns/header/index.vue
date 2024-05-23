<template>
  <div class=" bg-white w-full border-b border-b-zinc-200 px-2 py-1 dark:bg-zinc-800  dark:border-b-zinc-700">
    <div class=" flex items-center">
      <img v-lazy class="guide-home h-4 w-4 cursor-pointer mr-2 rounded-sm" :src="getImgs('kk.jpg')"
        @click="$router.push('/')">
      <header-search></header-search>
      <header-theme></header-theme>
      <header-my></header-my>
    </div>
  </div>
</template>

<script setup>
import { } from 'vue'
import getImgs from "@/utils/getImgs.js"
import HeaderSearch from "./cpns/header-search/index.vue"
import HeaderTheme from "./cpns/header-theme.vue"
import HeaderMy from "./cpns/header-my.vue"

</script>

<style lang='scss' scoped></style>
./cpns/header-search/header-search.vue