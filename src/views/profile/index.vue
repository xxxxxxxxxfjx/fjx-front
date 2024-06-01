<template>
  <div class="w-full h-full font-bold text-sm overflow-y-auto xl:bg-zinc-200">
    <div class="max-w-screen-lg xl:bg-white xl:mx-auto xl:rounded-sm xl:mt-2 xl:px-4 xl:py-2 relative">
      <!-- 移动端头部 -->
      <fjx-navbar sticky class="xl:hidden">个人资料</fjx-navbar>
      <!-- pc端头部 -->
      <div class=" hidden w-full text-lg font-bold text-center mb-4 xl:block">个人资料</div>
      <div class=" w-full p-1 xl:w-2/3 ">
        <!-- avatar -->
        <div class=" w-full mt-1 xl:mt-0 xl:absolute xl:left-[75%] xl:w-[100px] xl:flex xl:flex-col xl:item-center">
          <span class=" xl:text-center">我的头像</span>
          <img class=" w-8 h-8 rounded-full my-1 xl:mx-auto" :src="userInfo.avatar" alt="">
          <small class=" font-normal text-xs  text-zinc-700 xl:text-center">支持jpg、png、jpeg格式大小 5M 以内的图片</small>
        </div>

        <!-- 用户名 -->
        <div class="w-full my-2 xl:mt-0 xl:flex xl:items-center xl:mb-3">
          <p class="mb-1 xl:mb-0 xl:w-8">用户名</p>
          <fjx-input v-model="userInfo.nickname" class="font-normal xl:flex-1" :max="20"></fjx-input>
        </div>
        <!-- 职位 -->
        <div class="w-full my-2 xl:mt-0 xl:flex xl:items-center xl:mb-3">
          <p class="mb-1 xl:mb-0 xl:w-8">职位</p>
          <fjx-input v-model="userInfo.title" class="font-normal xl:flex-1"></fjx-input>
        </div>
        <!-- 公司 -->
        <div class="w-full my-2 xl:mt-0 xl:flex xl:items-center xl:mb-3">
          <p class="mb-1 xl:mb-0 xl:w-8">公司</p>
          <fjx-input v-model="userInfo.company" class="font-normal xl:flex-1"></fjx-input>
        </div>
        <!-- 个人主页 -->
        <div class="w-full my-2 xl:mt-0 xl:flex xl:items-center xl:mb-3">
          <p class="mb-1 xl:mb-0 xl:w-8">个人主页</p>
          <fjx-input v-model="userInfo.homePage" class="font-normal xl:flex-1"></fjx-input>
        </div>
        <!-- 个人介绍 -->
        <div class="w-full my-2 xl:mt-0 xl:flex xl:items-center xl:mb-3">
          <p class="mb-1 xl:mb-0 xl:w-8">个人介绍</p>
          <fjx-input v-model="userInfo.introduction" class="font-normal xl:flex-1" :max="50"
            type="textarea"></fjx-input>
        </div>
        <fjx-button class=" w-full font-normal my-3 xl:w-1/4 xl:mx-auto" :loading="loading"
          @click="handleSaveChange">保存修改</fjx-button>
        <fjx-button class=" w-full font-normal xl:hidden">退出登录</fjx-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, unref } from 'vue'
import { useUserStore } from '@/stores/user';
import { message } from '@/libs';
import { putProfile } from '@/services/modules/sys';

const userStore = useUserStore()

const userInfo = ref(JSON.parse(JSON.stringify(userStore.userInfo)))


// 保存修改
const loading = ref(false)
const handleSaveChange = async () => {
  try {
    loading.value = true
    await putProfile(userInfo.value)
    userStore.setUserInfo({
      ...userStore.userInfo,
      ...userInfo.value
    })
    message('success', '用户信息修改成功')
  } catch (error) {
    message('error', error.message)
  } finally {
    loading.value = false
  }
}

</script>

<style lang='scss' scoped></style>
