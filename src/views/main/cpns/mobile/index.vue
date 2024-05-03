<template>
  <div class=" bg-white sticky top-0 left-0 z-10">
    <ul ref="ulRef" class=" relative flex overflow-x-auto p-1 text-xs text-zinc-600 overflow-hidden">
      <li class="absolute  h-[22px] bg-zinc-900 rounded-lg duration-200 dark:bg-zinc-800" :style="sliderStyle"></li>
      <li
        class="z-20 fixed top-0 right-[-1px] h-4 px-1 flex items-center bg-white shadow-l-white dark:bg-zinc-900  dark:shadow-l-zinc"
        @click="handleClickHamburger">
        <fjx-svg-icon class=" w-1.5 h-1.5" name="hamburger"></fjx-svg-icon>
      </li>
      <li :ref="getLiRefs" v-for="(item, index) in  items " :key="item.id"
        class=" shrink-0 px-1.5 py-0.5 z-10 duration-200 last:mr-4" @click="handleClick(item, index)"
        :class="{ 'text-zinc-100': itemIndex === index }">
        {{ item.name }}
      </li>
      <fjx-popup v-model="show" type="true">
        <menue-vue v-model="items" @click:menu="handleClickMenu"></menue-vue>
      </fjx-popup>
    </ul>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useScroll } from "@vueuse/core"
import MenueVue from "@/components/menu/index.vue"
import { useCategoryStore } from '@/stores/category';

const categoryStore = useCategoryStore();

const items = defineModel()
const sliderStyle = ref({
  transform: 'translateX(0px)',
  width: '47px'
})


const itemIndex = ref(0) // 定义点击的li的index
const ulRef = ref(null) //获取父元素
const { x: ulScrollWidth } = useScroll(ulRef)
let itemRefs = []
const getLiRefs = (el) => {
  if (el) {
    itemRefs.push(el)
  }
}
const handleClick = (item, index) => {
  // console.log(index);
  itemIndex.value = index
  categoryStore.setCurrentCategory(item)
}
watch(itemIndex, (index) => {
  // console.log(index);
  const { left, width } = itemRefs[index]?.getBoundingClientRect()
  // console.log(left, width);
  sliderStyle.value = {
    transform: `translateX(${ulScrollWidth.value + left - 10}px)`,
    width: `${width}px`
  }
})



const show = ref(false);
const handleClickHamburger = () => {
  show.value = !show.value;
}


const handleClickMenu = (index) => {
  itemIndex.value = index
  show.value = !show.value;
}




</script>

<style lang='scss' scoped></style>
