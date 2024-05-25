<template>
  <div
    class=" relative w-screen h-screen bg-white dark:bg-zinc-900 xl:bg-zinc-100 xl:p-3 xl:dark:bg-zinc-800 overflow-hidden">
    <!-- pc端头部图标 -->
    <div class=" hidden w-[388px] mx-auto xl:block dark:hidden">
      <img class="w-full" src="https://res.lgdsunday.club/signlogo.png" alt="">
    </div>
    <!-- 移动端图标 -->
    <div class="w-full h-[100px] block xl:hidden relative ">
      <img src="https://res.lgdsunday.club/login-bg.png" class="dark:hidden">
      <img class=" absolute top-[40%] left-[50%] translate-x-[-50%] w-6"
        src="https://m.imooc.com/static/wap/static/common/img/logo-small@2x.png" alt="">
    </div>

    <!-- 表单 -->
    <div class="w-full xl:w-[400px] mx-auto bg-white dark:bg-zinc-900 rounded px-3 xl:p-4 mt-3">
      <h3 class="hidden w-full text-base font-bold text-center text-main dark:text-zinc-100 xl:block">账号登录</h3>
      <form class="w-full  mt-3">
        <input type="text"
          class="w-full outline-0 pl-1.5 mb-1 pb-1 border-b text-base text-zinc-800 dark:text-zinc-300 border-b-zinc-500  dark:border-b-zinc-300 bg-white dark:bg-zinc-900 dark:focus:border-b-zinc-100"
          placeholder="用户名" autocomplete="on">
        <input type="password"
          class="w-full outline-0 pl-1.5 mb-1 pb-1 border-b text-base text-zinc-800 dark:text-zinc-300 border-b-zinc-500  dark:border-b-zinc-300 bg-white dark:bg-zinc-900 dark:focus:border-b-zinc-100"
          placeholder="密码" autocomplete="on">
        <div class="w-full text-end mb-2">
          <a class=" text-zinc-400 text-sm p-1 cursor-pointer hover:text-zinc-800 dark:hover:text-zinc-100">去注册</a>
        </div>
        <fjx-button class="w-full dark:bg-zinc-800 xl:dark:bg-zinc-800">登录</fjx-button>
      </form>
      <div class="w-full flex justify-around mt-5">
        <fjx-svg-icon class="w-4 h-4 cursor-pointer" name="qq"></fjx-svg-icon>
        <fjx-svg-icon class="w-4 h-4 cursor-pointer" name="wexin"></fjx-svg-icon>
      </div>

    </div>

  </div>
</template>

<script setup>
import { } from 'vue'

</script>

<style lang='scss' scoped></style>
