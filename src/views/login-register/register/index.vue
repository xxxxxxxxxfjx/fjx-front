<template>
  <div
    class=" relative w-screen h-screen bg-white dark:bg-zinc-900 xl:bg-zinc-100 xl:p-3 xl:dark:bg-zinc-800 overflow-hidden">
    <!-- 顶部图片 -->
    <header-vue></header-vue>
    <!-- 表单 -->
    <div class="w-full xl:w-[400px] mx-auto bg-white dark:bg-zinc-900 rounded px-3 xl:p-4 mt-3">
      <h3 class="hidden w-full text-base font-bold text-center text-main dark:text-zinc-100 xl:block">注册账号</h3>
      <vee-form class="w-full  mt-3" @submit="handleSubmit">
        <!-- 用户名 -->
        <div class="w-full relative">
          <vee-field type="text" v-model="form.username"
            class="w-full outline-0 pl-1.5 mb-1 pb-1 border-b text-base text-zinc-800 dark:text-zinc-300 border-b-zinc-500  dark:border-b-zinc-300 bg-white dark:bg-zinc-900 dark:focus:border-b-zinc-100"
            placeholder="用户名" autocomplete="on" name="username" :rules="usernameValidate" />
          <vee-error-message class=" text-xs text-main font-bold absolute bottom-[-15px] left-0"
            name="username"></vee-error-message>
        </div>
        <!-- 密码 -->
        <div class="w-full relative">
          <vee-field type="password" v-model="form.password"
            class="w-full outline-0 pl-1.5 mb-1 pb-1 border-b text-base text-zinc-800 dark:text-zinc-300 border-b-zinc-500  dark:border-b-zinc-300 bg-white dark:bg-zinc-900 dark:focus:border-b-zinc-100"
            placeholder="密码" autocomplete="on" name="password" :rules="passwordValidate" />
          <vee-error-message class=" text-xs text-main font-bold absolute bottom-[-15px] left-0"
            name="password"></vee-error-message>
        </div>
        <!-- 验证密码 -->
        <div class="w-full relative">
          <vee-field type="password" v-model="form.rePassword"
            class="w-full outline-0 pl-1.5 mb-1 pb-1 border-b text-base text-zinc-800 dark:text-zinc-300 border-b-zinc-500  dark:border-b-zinc-300 bg-white dark:bg-zinc-900 dark:focus:border-b-zinc-100"
            placeholder="确认密码" autocomplete="on" name="rePassword" rules="confirmPassword:@password" />
          <vee-error-message class=" text-xs text-main font-bold absolute bottom-[-15px] left-0"
            name="rePassword"></vee-error-message>
        </div>

        <div class="w-full text-end mb-2">
          <a class=" text-zinc-400 text-sm p-1 cursor-pointer hover:text-zinc-800 dark:hover:text-zinc-100"
            @click="handleLogin">去登录</a>
        </div>
        <!-- 注册协议 -->
        <div class="w-full text-center mb-2">
          <a class=" text-zinc-400 text-sm p-1 cursor-pointer hover:text-zinc-800 dark:hover:text-zinc-100"
            href="https://m.imooc.com/newfaq?id=89" target="__black">注册即同意《慕课网注册协议》</a>
        </div>
        <!-- 按钮 -->
        <fjx-button class="w-full dark:bg-zinc-800 xl:dark:bg-zinc-800" :loading="loading"
          :isActivateAnimation="false">立即注册</fjx-button>
      </vee-form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import HeaderVue from "../cpns/header.vue"
import { usernameValidate, passwordValidate, confirmPassword } from "@/utils/validate"
import { Field as VeeField, Form as VeeForm, ErrorMessage as VeeErrorMessage, defineRule } from "vee-validate"
import { message } from "@/libs/index.js"
import { postRegisterApi } from "@/services/modules/sys"
import { useUserStore } from "@/stores/user"
import { useAppStore } from "@/stores/app"
import { useRouter } from 'vue-router'

// 新增验证规则
defineRule("confirmPassword", confirmPassword)

const router = useRouter()
// userStore 
const userStore = useUserStore()
const appStore = useAppStore()
// 表单
const form = reactive({
  username: 'LGD_Sunday',
  password: '123123',
  rePassword: ''
})
// 注册按钮loading
const loading = ref(false)

// 表单提交 注册
const handleSubmit = async () => {
  try {
    loading.value = true
    await postRegisterApi({
      username: form.username,
      password: form.password
    })
    message("success", '用户注册成功')
    // 移动端下router跳转类型
    appStore.setRouterType('push')
    router.push('/login')
  } catch (error) {
    message("error", error.message)
  } finally {
    loading.value = false
  }
}

const handleLogin = () => {
  // 移动端下router跳转类型
  appStore.setRouterType('push')
  router.push('/login')
}
</script>

<style lang='scss' scoped></style>
