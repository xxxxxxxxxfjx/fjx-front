<template>
  <div>
    <!-- PC端 -->
    <div v-if="!isMobileTerminal">
      <notice-vue class=" mt-2"></notice-vue>
      <div class="flex flex-col border rounded mt-2 justify-center items-center py-2 ">
        <p>
          <span class="text-base">支付金额：</span>
          <span class="text-lg text-red-600">￥19</span>
        </p>
        <div class="flex items-center py-2 px-5 border mt-2 rounded-sm cursor-pointer">
          <fjx-svg-icon class="w-4 h-4 mr-2" name="zfb"></fjx-svg-icon>
          <span class="text-lg">支付宝</span>
        </div>
      </div>
    </div>
    <!-- 移动端 -->
    <div v-else class="fixed bottom-0 left-0 right-0 z-50">
      <notice-vue class="border-none border-t border-t-red-500"></notice-vue>
      <div class="flex justify-between items-center px-1">
        <div class="flex flex-col">
          <p class="text-sm scale-75">券后合计：<span class="text-xl text-red-500">￥9</span></p>
          <span class="text-sm text-red-500 scale-75">优惠券：限时立减 ￥10</span>
        </div>
        <fjx-button class="w-[120px]">立即开通</fjx-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { } from 'vue'
import { isMobileTerminal } from '@/utils/flexiable';
import NoticeVue from './notice.vue'


</script>

<style lang='scss' scoped></style>
