<template>
  <!-- <fjx-waterfall class="w-full  px-1" :data="pexelsList" nodeKey="id" :columns="isMobileTerminal ? 2 : 5"
    :picturePreReading="false">
    <template #default="{ item, width, index }">
      <item-vue :data="item" :columnWidth="width" :index="index" />
    </template>
</fjx-waterfall> -->
  <fjx-infinite v-model="loading" :isFinished="isFinished" @onLoading="getPexelsList">
    <e-waterfall class="w-full  px-1" :data="pexelsList" nodeKey="id" :columns="isMobileTerminal ? 2 : 5"
      :picturePreReading="false">

      <template #default="{ item, width, index }">
        <item-vue :data="item" :columnWidth="width" :index="index" @click="handleClick" />
      </template>
    </e-waterfall>
  </fjx-infinite>
  <!-- <e-infinite v-model="loading" :isFinished="isFinished" @onLoading="getPexelsList">
    <e-waterfall class="w-full  px-1" :data="pexelsList" nodeKey="id" :columns="isMobileTerminal ? 2 : 5"
      :picturePreReading="false">

      <template #default="{ item, width, index }">
        <item-vue :data="item" :columnWidth="width" :index="index" />
      </template>
    </e-waterfall>
  </e-infinite> -->
  <transition :css="false" @before-enter="beforeEnter" @enter="enter" @leave="leave">
    <pins-vue v-if="isPinsVisiable" :id="currentPin.id"></pins-vue>
  </transition>
</template>

<script setup>
import { ref, watch } from 'vue'
import ItemVue from "./item.vue"
import { getPexelsListApi } from "@/services/modules/pexels"
import { isMobileTerminal } from "@/utils/flexiable"
import { useAppStore } from '@/stores/app';
import PinsVue from "@/components/pins/pins.vue"
import { gsap } from "gsap";
import { useEventListener } from '@vueuse/core';

const appStore = useAppStore();

let data = {
  page: 1,
  size: 20
}
const loading = ref(false)
const isFinished = ref(false)
const pexelsList = ref([])
const getPexelsList = async () => {
  if (isFinished.value) {
    return
  }

  if (pexelsList.value.length) {
    data.page++
  }
  const res = await getPexelsListApi(data)
  // console.log(res);

  if (data.page === 1) {
    pexelsList.value = res.list
  } else {
    pexelsList.value.push(...res.list)
  }
  if (pexelsList.value.length === res.total) {
    isFinished.value = true
  }
  loading.value = false
}

const resetQuery = (newRequery) => {
  data = {
    ...data,
    ...newRequery
  }
  pexelsList.value = []
  isFinished.value = false
}

watch(() => appStore.currentCategory, (currentCategory) => {
  resetQuery({
    page: 1,
    categoryId: currentCategory.id
  })
})

// 监听搜索文本变化
watch(() => appStore.searchText, (val) => {
  resetQuery({
    page: 1,
    searchText: val
  })
})


// 显示控制
const isPinsVisiable = ref(false)
// 记录当前的Pin对象
const currentPin = ref(null)

// 处理点击显示详情
const handleClick = (item) => {
  // console.log(item);
  history.pushState({}, "", `/photo/${item.id}`)
  currentPin.value = item
  isPinsVisiable.value = true
  // history.pushState({}, '', `/photo/${props.data.id}`)
}

// 进入动画之前的状态
const beforeEnter = (el) => {
  gsap.set(el, {
    scaleX: 0,
    scaleY: 0,
    transformOrigin: '0 0',
    translateX: currentPin.value?.location.translateX,
    translateY: currentPin.value?.location.translateY,
    opacity: 0
  })
}
// 进入动画中
const enter = (el, done) => {
  gsap.to(el, {
    scaleX: 1,
    scaleY: 1,
    opacity: 1,
    translateX: 0,
    translateY: 0,
    duration: 0.3,
    onComplete: done
  })
}

// 关闭组件，回到初始状态
const leave = (el, done) => {
  gsap.to(el, {
    scaleX: 0,
    scaleY: 0,
    opacity: 0,
    translateX: currentPin.value?.location.translateX,
    translateY: currentPin.value?.location.translateY,
    duration: 0.3,
  })
}

useEventListener(window, 'popstate', () => {
  isPinsVisiable.value = false
})
</script>

<style lang='scss' scoped></style>
