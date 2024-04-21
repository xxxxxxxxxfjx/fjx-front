<template>
  <div class=" sticky top-0 left-0 w-full bg-white z-10 dark:bg-zinc-900 xl:dark:bg-zinc-800">
    <ul
      class=" relative mx-auto w-[820px]  bg-white flex flex-wrap justify-center px-[10px] py-1 overflow-hidden duration-300 dark:bg-zinc-900 xl:dark:bg-zinc-800"
      :class="[isOpen ? 'h-[210px]' : 'h-[60px]']">
      <div
        class="absolute right-1 bottom-1.5 p-1 rounded cursor-pointer duration-200  hover:bg-zinc-200 dark:hover:bg-zinc-900"
        @click="isOpen = !isOpen">
        <fjx-svg-icon :name="isOpen ? 'fold' : 'unfold'" class="w-1 h-1"
          fillClass="fill-zinc-900 dark:fill-zinc-300"></fjx-svg-icon>
      </div>
      <li v-for="(item, index) in categorys" :key="item.id" @click="currentIndex = index"
        class="h-4 leading-4 px-1.5 mr-1 mb-1  rounded font-bold text-base duration-200 cursor-pointer hover:bg-zinc-200  dark:text-zinc-500 dark:hover:text-zinc-300  dark:hover:bg-zinc-900"
        :class="[currentIndex === index ? 'bg-zinc-200 dark:text-zinc-300  dark:bg-zinc-900' : '']">
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const categorys = defineModel()
const isOpen = ref(false)

const currentIndex = ref(0)


</script>

<style lang='scss' scoped></style>
