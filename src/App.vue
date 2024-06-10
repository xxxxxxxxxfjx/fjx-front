<script setup>
// import { message } from './libs/message';
// message('success', '22222222222', 3000)
import { useAppStore } from '@/stores/app';
import { ref } from 'vue'
const appStore = useAppStore()

// 测试代码
const text = ref('')
const rules = [
  { type: 'require', message: '请输入内容' },
  { type: 'max', value: 20, message: '最多30个字符' },
]

const columns = [{ title: '姓名', key: 'name' }, { title: '年龄', key: 'age' }, { title: '操作', key: 'operate', slots: 'operate' }]
const dataSource = [
  { name: '张三ssssssssssssssssss', age: 24 },
  { name: '李四ssssssssssssssss', age: 45 },
  { name: 'xxxxxx', age: 45 },
  { name: '李四', age: 45 },
  { name: '李四', age: 45 },
  { name: '李四', age: 45 },
  { name: '李四ssssssssssssssssss', age: 45 },
  { name: '李四', age: 45 },
  { name: '李四', age: 45 },
  { name: '李四', age: 45 },
  { name: '李四', age: 45 },
  { name: '李四', age: 45 },
  { name: '李四', age: 45 },
  { name: '李四', age: 45 },
  { name: '李四', age: 45 },
  { name: '李四', age: 45 },
  { name: '李四', age: 45 },
]
const handleClickRow = (row) => {
  console.log(row);
}
const isVisiable = ref(true)

</script>

<template>
  <!-- <fjx-confirm content="要删除所有历史记录吗？"></fjx-confirm> -->
  <!-- <fjx-message type="success" content="222222222"></fjx-message> -->
  <!-- <fjx-input v-model="text" class="w-[300px]" type="textarea" max="30"></fjx-input> -->
  <!-- <fjx-validate-input v-model="text" class="w-[300px]" :rules="rules" placeholder="请输入内容"></fjx-validate-input> -->
  <!-- <fjx-table class=" w-[500px] border" :columns="columns" :dataSource="dataSource" :serialNumber="true" height="200"
    @click-row="handleClickRow">
    <template #operate="{ row }">
      <fjx-button type="primary" size="small" @click.stop="() => console.log(row)">编辑</fjx-button>
    </template>
</fjx-table> -->
  <!-- <fjx-dialog v-model="isVisiable" title="标题">测试内容</fjx-dialog> -->
  <div class="fixed top-0 left-0 w-screen h-screen">
    <!-- <router-view></router-view> -->
    <fjx-transition-router-view :routerType="appStore.getRouterType()"
      mainComponent="home"></fjx-transition-router-view>
  </div>
</template>

<style scoped></style>
