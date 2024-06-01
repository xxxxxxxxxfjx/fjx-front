<template>
  <fjx-popover class="guide-my">
    <template #reference>
      <div v-if="userStore.token"
        class="flex items-center relative cursor-pointer p-0.5 rounded-sm hover:bg-zinc-100/90 dark:hover:bg-zinc-900">
        <div class=" relative">
          <img v-lazy :src="userStore.userInfo.avatar || defaultAvatar" class="w-4 h-3 rounded-sm" alt="">
          <fjx-svg-icon v-if="userStore.userInfo.vipLevel" name="vip"
            class=" absolute w-1.5 h-1.5 bottom-[-5px] right-0"></fjx-svg-icon>
        </div>
        <fjx-svg-icon name="down-arrow" class=" w-1 h-1 ml-1" fillClass="dark:fill-zinc-300"></fjx-svg-icon>
      </div>
      <div v-else>
        <fjx-button type="main" icon="profile" iconColor="#fff" @click="handleLogin"></fjx-button>
      </div>
    </template>

    <div v-if="userStore.token" class="w-[140px] overflow-auto">
      <div v-for="(item, index) in menuArr" :key="index" @click="handleMenuClick(item)"
        class="flex p-1  rounded cursor-pointer hover:bg-zinc-100/60 dark:hover:bg-zinc-800">
        <fjx-svg-icon :name="item.icon" class="w-1.5 h-1.5 mr-1"
          fillClass="text-gray-500 dark:fill-zinc-300"></fjx-svg-icon>
        <span class="text-gray-500 text-sm dark:text-zinc-300">{{ item.title }}</span>
      </div>
    </div>
  </fjx-popover>
</template>

<script setup>
import { useUserStore } from '@/stores/user';
import { } from 'vue'
import { useRouter } from 'vue-router';
import { confirm } from "@/libs"

const defaultAvatar = 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2Fedpic_source%2F0c%2Fef%2Fa0%2F0cefa0f17b83255217eddc20b15395f9.jpg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1651074011&t=ba5d64079381425813e4c269bcac1a1b'
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

// 处理登录跳转
const router = useRouter()
const handleLogin = () => {
  router.push('/login')
}

const userStore = useUserStore()
console.log(userStore.token);
// 用户菜单点击事件处理
const handleMenuClick = (item) => {
  // 有路径的直接跳转
  if (item.path) {
    router.push(item.path)
    return
  }
  // 没路劲则是退出
  confirm("您确定要退出登录吗？").then(() => {
    router.push('/')

    // 清除用户信息和token
    userStore.$reset()
    // 刷新页面
    // location.reload()
  })

}


</script>

<style lang='scss' scoped></style>
