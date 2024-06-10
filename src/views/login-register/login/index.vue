<template>
  <div
    class=" relative w-screen h-screen bg-white dark:bg-zinc-900 xl:bg-zinc-100 xl:p-3 xl:dark:bg-zinc-800 overflow-hidden">
    <!-- 顶部图片 -->
    <header-vue></header-vue>
    <!-- 表单 -->
    <div class="w-full xl:w-[400px] mx-auto bg-white dark:bg-zinc-900 rounded px-3 xl:p-4 mt-3">
      <h3 class="hidden w-full text-base font-bold text-center text-main dark:text-zinc-100 xl:block">账号登录</h3>
      <vee-form class="w-full  mt-3" @submit="handleSubmit">
        <div class="w-full relative">
          <vee-field type="text" v-model="form.username"
            class="w-full outline-0 pl-1.5 mb-1 pb-1 border-b text-base text-zinc-800 dark:text-zinc-300 border-b-zinc-500  dark:border-b-zinc-300 bg-white dark:bg-zinc-900 dark:focus:border-b-zinc-100"
            placeholder="用户名" autocomplete="on" name="username" :rules="usernameValidate" />
          <vee-error-message class=" text-xs text-main font-bold absolute bottom-[-15px] left-0"
            name="username"></vee-error-message>
        </div>
        <div class="w-full relative">
          <vee-field type="password" v-model="form.password"
            class="w-full outline-0 pl-1.5 mb-1 pb-1 border-b text-base text-zinc-800 dark:text-zinc-300 border-b-zinc-500  dark:border-b-zinc-300 bg-white dark:bg-zinc-900 dark:focus:border-b-zinc-100"
            placeholder="密码" autocomplete="on" name="password" :rules="passwordValidate" />
          <vee-error-message class=" text-xs text-main font-bold absolute bottom-[-15px] left-0"
            name="password"></vee-error-message>
        </div>

        <div class="w-full text-end mb-2">
          <a class=" text-zinc-400 text-sm p-1 cursor-pointer hover:text-zinc-800 dark:hover:text-zinc-100"
            @click="handleRegister">去注册</a>
        </div>
        <fjx-button class="w-full dark:bg-zinc-800 xl:dark:bg-zinc-800" :loading="loading"
          :isActivateAnimation="false">登录</fjx-button>
      </vee-form>
      <!-- 第三方登录 -->
      <div class="w-full flex justify-around mt-5">
        <fjx-svg-icon class="w-4 h-4 cursor-pointer" name="qq"></fjx-svg-icon>
        <fjx-svg-icon class="w-4 h-4 cursor-pointer" name="wexin"></fjx-svg-icon>
      </div>
    </div>
    <slider-captcha-vue v-if="isVisiable" @close="handleClose" @success="handleSuccess"
      @failed="handleFalied"></slider-captcha-vue>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import HeaderVue from "../cpns/header.vue"
import { usernameValidate, passwordValidate } from "@/utils/validate"
import { Field as VeeField, Form as VeeForm, ErrorMessage as VeeErrorMessage } from "vee-validate"
import SliderCaptchaVue from './slider-captcha.vue'
import { message } from "@/libs/index.js"
import { postLoginApi } from "@/services/modules/sys"
import { LOGIN_TYPE_USERNAME } from "@/constants"
import { useUserStore } from "@/stores/user"
import { useAppStore } from "@/stores/app"
import { useRouter } from 'vue-router'


const router = useRouter()
// userStore 
const userStore = useUserStore()
const appStore = useAppStore()
// 表单
const form = reactive({
  username: 'LGD_Sunday',
  password: '123123',
})
// 登录按钮loading
const loading = ref(false)
// 控制人类行为验证组件
const isVisiable = ref(false)
// 关闭人类行为验证
const handleClose = () => {
  isVisiable.value = false
}
// 表单提交
const handleSubmit = () => {
  // console.log("出发登录");
  isVisiable.value = true
}

// 处理人类行为验证成功事件
const handleSuccess = () => {
  setTimeout(() => {
    message('success', '验证成功')
    isVisiable.value = false
    onLogin()
  }, 500)
}

// 处理人类行为验证失败事件
const handleFalied = () => {
  setTimeout(() => {
    message('error', '验证失败')
  }, 500)
}

// 登录请求
const onLogin = async () => {
  try {
    loading.value = true
    // 登录
    const res = await userStore.postUserLoginApi({
      ...form,
      loginType: LOGIN_TYPE_USERNAME
    })
    // const res = await postLoginApi({
    //   ...form,
    //   loginType: LOGIN_TYPE_USERNAME
    // })
    if (res) {
      message("success", "登录成功")
      // 获取用户信息
      const data = await userStore.getUserInfosApi()
      message(
        'success',
        `欢迎您 ${data.vipLevel
          ? '尊贵的 VIP' + data.vipLevel + ' 用户 ' + data.nickname
          : data.nickname
        } `,
        6000
      )
      router.push("/")
    } else {
      message("error", "登录失败")
      return
    }
  } catch (error) {
    // console.log(error);
    message("error", error.message)
  } finally {
    loading.value = false
  }
}


const handleRegister = () => {
  // 移动端下router跳转类型
  appStore.setRouterType('push')
  router.push('/register')
}
</script>

<style lang='scss' scoped></style>
