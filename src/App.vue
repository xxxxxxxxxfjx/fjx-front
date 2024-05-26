<script setup>
// import { message } from './libs/message';
// message('success', '22222222222', 3000)
// import { ref } from 'vue'
// const text = ref('')
</script>

<template>
  <!-- <fjx-confirm content="要删除所有历史记录吗？"></fjx-confirm> -->
  <!-- <fjx-message type="success" content="222222222"></fjx-message> -->
  <!-- <fjx-input v-model="text" class="w-[300px]" type="textarea" max="30"></fjx-input> -->
  <div class="fixed top-0 left-0 w-screen h-screen">
    <router-view></router-view>
  </div>
</template>

<style scoped></style>
