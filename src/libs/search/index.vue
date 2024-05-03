<template>
  <div class="group w-full  rounded-xl p-0.5   relative duration-500 hover:border-red-100 flex hover:bg-red-100/45">
    <div class="w-full">
      <fjx-svg-icon name="search" color="#707070"
        class="w-1.5 h-1.5 absolute top-[50%] translate-y-[-50%] left-2"></fjx-svg-icon>
      <input v-model="inputValue" @focus="inputFocus = true" @blur="inputFocus = false" type="text"
        class=" block w-full h-[44px] pl-4 outline-0 bg-zinc-100 caret-zinc-400 rounded-xl
         text-zinc-900 tracking-wide font-semibold border border-zinc-100 duration-500 text-sm
        group-hover:bg-white group-hover:border-zinc-200 focus:border-red-300 dark:bg-zinc-800  dark:text-zinc-200  dark:border-zinc-700  dark:group-hover:bg-zinc-900 dark:group-hover:border-zinc-700"
        placeholder="搜索">
      <fjx-svg-icon v-if="inputValue" name="input-delete" @click="inputValue = ''"
        class="h-1.5 w-1.5 opacity-100 absolute top-[50%] translate-y-[-50%] right-9 duration-500 cursor-pointer"></fjx-svg-icon>
      <div
        class='w-[1px] h-1.5 bg-zinc-200 absolute top-[50%] translate-y-[-50%] right-[62px] duration-500 opacity-0 group-hover:opacity-100'>
      </div>
      <fjx-button @click="handleSearch"
        class=" absolute right-1 top-[50%] translate-y-[-50%] group-hover:bg-red-400 opacity-0 duration-500 group-hover:opacity-100 rounded-full"
        icon="search" iconColor="#fff"></fjx-button>
    </div>
    <transition name="slide">
      <div v-show="inputFocus" v-if="slots.dropdown"
        class=" max-h-[368px] w-full text-base overflow-auto bg-white absolute z-20 left-0 top-[56px] p-2 rounded border border-zinx-200 duration-200 hover:shadow-3xl dark:bg-zinc-800  dark:border-zinc-600">
        <slot name="dropdown" />
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, useSlots } from 'vue'

const slots = useSlots()

const inputValue = defineModel()

const inputFocus = ref(false)
const handleSearch = () => {
  try {
    if (!inputValue.value.length) {
      return
    }
  }
  catch (err) {

  }
}






</script>

<style lang='scss' scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all .6s;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateY(40px);
  opacity: 0;
}
</style>
