<template>
  <div
    class="w-full border border-yellow-400 bg-orange-300/15 rounded-sm py-1 flex justify-center items-center text-red-600">
    <fjx-svg-icon name="countdown" class="w-1.5 h-1.5 mr-1 text-xs" fillClass="fill-red-600"></fjx-svg-icon>
    <span class="text-sm">限时特惠 | 距离优惠结束仅剩 </span>
    <fjx-count-down class=" font-bold ml-0.5" :time="1000 * 60"></fjx-count-down>
  </div>
</template>

<script setup>
import { } from 'vue'

</script>

<style lang='scss' scoped></style>
