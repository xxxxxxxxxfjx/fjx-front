<script setup>
// import { message } from './libs/message';
// message('success', '22222222222', 3000)
// import { ref } from 'vue'
// const text = ref('')
// const rules = [
//   { type: 'require', message: '请输入内容' },
//   { type: 'max', value: 20, message: '最多30个字符' },
// ]
</script>

<template>
  <!-- <fjx-confirm content="要删除所有历史记录吗？"></fjx-confirm> -->
  <!-- <fjx-message type="success" content="222222222"></fjx-message> -->
  <!-- <fjx-input v-model="text" class="w-[300px]" type="textarea" max="30"></fjx-input> -->
  <!-- <fjx-validate-input v-model="text" class="w-[300px]" :rules="rules" placeholder="请输入内容"></fjx-validate-input> -->
  <div class="fixed top-0 left-0 w-screen h-screen">
    <router-view></router-view>
  </div>
</template>

<style scoped></style>
