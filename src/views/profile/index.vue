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
          <div class="w-[80px] h-[80px] xl:mx-auto rounded-full overflow-hidden my-1 group cursor-pointer relative"
            @click="handleClickAvater">
            <!-- 头像 -->
            <img class="w-full h-full" :src="userInfo.avatar" alt="">
            <!-- 鼠标移入 -->
            <div
              class=" bg-black/4 absolute top-0 left-0 w-full h-full -z-10 flex flex-col justify-center items-center group-hover:z-10">
              <fjx-svg-icon name="change-header-image" class="w-2 h-2 mb-0.5" fillClass="fill-white"></fjx-svg-icon>
              <span class=" text-xs text-zinc-50 font-thin scale-90">点击更换头像</span>
            </div>
          </div>
          <!-- 隐藏内容 -->
          <input v-show="false" ref="fileRef" type="file" accept=".jpg,.jpeg,.png,.gif" @change="handleFileChange">
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
        <!-- 隐藏内容 -->
        <!-- <input ref="fileRef" type="file" accept=".jpg,.jpeg,.png,.gif" @change="handleFileChange"> -->
      </div>
    </div>
    <fjx-dialog v-if="!isMobileTerminal" title="图片裁剪" v-model="isVisiable">
      <change-avatar-vue :blob="currentBlob" @close="isVisiable = false"></change-avatar-vue>
    </fjx-dialog>
    <fjx-popup v-else v-model="isVisiable" :class="{ ' h-screen': isVisiable }">
      <change-avatar-vue :blob="currentBlob" @close="isVisiable = false"></change-avatar-vue>
    </fjx-popup>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useUserStore } from '@/stores/user';
import { message } from '@/libs';
import { putProfile } from '@/services/modules/sys';
import { isMobileTerminal } from '@/utils/flexiable';
import ChangeAvatarVue from "@/components/change-avatar/index.vue"

const fileRef = ref(null)

const userStore = useUserStore()

// 拷贝用户信息
let userInfo = ref(JSON.parse(JSON.stringify(userStore.userInfo)))

// 保存修改
const loading = ref(false)
// 提交修改信息
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

// 点击头像事件
const handleClickAvater = () => {
  fileRef.value.click()
}
// 控制弹窗
const isVisiable = ref(false)
// 存储文件对应的本地URL
const currentBlob = ref('')
// 选中上传图片
const handleFileChange = () => {
  // console.log("ok");
  const imgFile = fileRef.value.files[0]
  const blob = URL.createObjectURL(imgFile)
  currentBlob.value = blob
  isVisiable.value = true
}

// 清空当前input中的value，防止读取同一文件时，第一次之后的文件不加载
watch(isVisiable, (val) => {
  if (!val) {
    fileRef.value.value = null
  }
})


watch(() => userStore.userInfo, val => {
  console.log(val);
  userInfo.value = JSON.parse(JSON.stringify(val))
}, {
  deep: true
})
</script>

<style lang='scss' scoped></style>
