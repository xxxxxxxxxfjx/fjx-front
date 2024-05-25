<template>
  <div class=" w-full h-full bg-zinc-50 dark:bg-zinc-950">
    <pins-vue :id="$route.params.id"></pins-vue>
  </div>
</template>

<script setup>
import { } from 'vue'
import PinsVue from "./pins.vue"

</script>

<style lang='scss' scoped></style>
