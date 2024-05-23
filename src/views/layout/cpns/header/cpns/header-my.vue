<template>
  <fjx-popover class="guide-my">
    <template #reference>
      <div
        class="flex items-center relative cursor-pointer p-0.5 rounded-sm hover:bg-zinc-100/90 dark:hover:bg-zinc-900">
        <img v-lazy
          src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2Fedpic_source%2F0c%2Fef%2Fa0%2F0cefa0f17b83255217eddc20b15395f9.jpg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1651074011&t=ba5d64079381425813e4c269bcac1a1b"
          class="w-3 h-3 rounded-sm" alt="">
        <fjx-svg-icon name="down-arrow" class=" w-1.5 h-1.5 ml-1" fillClass="dark:fill-zinc-300"></fjx-svg-icon>
      </div>
    </template>

    <div class="w-[140px] overflow-auto">
      <div v-for="(item, index) in menuArr" :key="index"
        class="flex p-1  rounded cursor-pointer hover:bg-zinc-100/60 dark:hover:bg-zinc-800">
        <fjx-svg-icon :name="item.icon" class="w-1.5 h-1.5 mr-1"
          fillClass="text-gray-500 dark:fill-zinc-300"></fjx-svg-icon>
        <span class="text-gray-500 text-sm dark:text-zinc-300">{{ item.title }}</span>
      </div>
    </div>
  </fjx-popover>
</template>

<script setup>
import { } from 'vue'
const menuArr = [
  {
    id: 0,
    title: '个人资料',
    icon: 'profile',
    path: '/profile'
  },
  {
    id: 1,
    title: '升级 VIP',
    icon: 'vip-profile',
    path: '/member'
  },
  {
    id: 2,
    title: '退出登录',
    icon: 'logout',
    path: ''
  }
]

</script>

<style lang='scss' scoped></style>
