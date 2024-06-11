<template>
  <div class="w-full px-1 ">
    <p class=" text-[34px] font-bold text-yellow-600 text-center mt-4 tracking-widest xl:mt-2">精选VIP</p>
    <p class="text-lg text-center text-yellow-500">升级精选VIP，畅想所有内容</p>
    <div
      class=" flex overflow-auto mt-3 py-4 xl:scrollbar-thin xl:scrollbar-thumb-zinc-200 xl:dark:scrollbar-thumb-zinc-900 xl:scrollbar-track-transparent">
      <div
        class="relative min-w-[100px] xl:min-w-[150px] border mx-1 rounded flex flex-col justify-center items-center px-1 py-3 cursor-pointer"
        v-for="(item, index) in payList" :key="item.id"
        :class="{ 'border-yellow-400': currentIndex === item.id, ' bg-orange-300/15': currentIndex === item.id }"
        @click="handleClick(item)">
        <span class="text-base text-yellow-800">{{ item.title }}</span>
        <p class="font-bold text-yellow-800">
          <span class="text-base mr-1">￥</span>
          <span class="text-[32px]">{{ item.price }}</span>
        </p>
        <span class="text-sm text-yellow-500 line-through">￥{{ item.oldPrice }}</span>
        <span v-if="item.isHot"
          class="text-yellow-700 to-orange-100 from-orange-300 bg-gradient-to-r text-[12px] w-[48px] h-[22px] text-center leading-[22px] rounded-bl-md rounded-tr-md absolute -top-[12px] right-0">热销</span>
      </div>
    </div>
    <p v-if="!isMobileTerminal" class=" text-sm text-gray-500 py-1">{{ desc }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getVipPayList } from '@/services/modules/pay';
import { isMobileTerminal } from '@/utils/flexiable';


const payList = ref([])
const getData = async () => {
  const res = await getVipPayList()
  console.log(res);
  payList.value = res
}
getData()

const desc = ref('次月 ¥19 续费,可随时取消')
const currentIndex = ref(0)
const handleClick = (item) => {
  currentIndex.value = item.id
  desc.value = item.desc
}

</script>

<style lang='scss' scoped></style>
