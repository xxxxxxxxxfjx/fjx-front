<template>
  <div class="w-full  bg-white  xl:bg-zinc-200 xl:overflow-hidden xl:flex xl:justify-center">
    <div class="xl:w-[1000px] xl:bg-white xl:mt-1 xl:rounded-sm xl:max-h-[800px] xl:px-3">
      <!-- 移动端 -->
      <fjx-navbar v-if="isMobileTerminal">精选会员</fjx-navbar>
      <pay-list-vue></pay-list-vue>
      <pay-vue></pay-vue>
    </div>
  </div>
</template>

<script setup>
import { isMobileTerminal } from '@/utils/flexiable';
import PayListVue from './payList.vue'
import PayVue from './pay.vue'





</script>

<style lang='scss' scoped></style>
