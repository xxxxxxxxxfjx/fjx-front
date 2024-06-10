<template>
  <div class=" w-min-[180px] px-2 py-1 rounded-2xl flex justify-between items-center bg-zinc-100 dark:bg-zinc-800">
    <slot />
  </div>
</template>

<script setup>
import { } from 'vue'
import { isMobileTerminal } from '@/utils/flexiable';

</script>

<style lang='scss' scoped></style>
