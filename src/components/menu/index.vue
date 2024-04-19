<template>
  <div class="mobile-menu h-[80vh] flex flex-col">
    <h2 class=" text-xl font-bold px-1 py-1 text-zinc-900 dark:text-zinc-200">所有分类</h2>
    <ul class="flex flex-col flex-1 overflow-y-auto  text-zinc-900">
      <li class="px-1 text-lg py-1 duration-100 active:bg-zinc-100 dark:text-zinc-300  active:dark:bg-zinc-900"
        v-for="(item, index) in categories" :key="item.id" @click="handleClickMenu(index)">{{
          item.name
        }}</li>
    </ul>
  </div>
</template>

<script setup>
import { } from 'vue'
const emits = defineEmits(['click:menu'])
const categories = defineModel()



const handleClickMenu = (index) => {
  emits('click:menu', index)
}
</script>

<style lang='scss' scoped></style>
