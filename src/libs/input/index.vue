<template>
  <div class=" relative leading-[0]">
    <!-- 单行 -->
    <input v-if="type === INPUT" type="text" v-model="text"
      class=" w-full py-0.5 px-1 outline-0 border border-gray-300 text-sm text-zinc-900 dark:text-zinc-500 rounded-sm focus:border-blue-400"
      :maxlength="max">
    <!-- 多行 -->
    <textarea v-if="type === TEXTAREA" v-model="text"
      class=" w-full py-0.5 px-1 outline-0 border border-gray-300 text-sm text-zinc-900 dark:text-zinc-500 rounded-sm focus:border-blue-400"
      rows="5" :maxlength="max"></textarea>
    <!-- 输入数量 -->
    <span v-if="max" class=" text-xs text-gray-400 absolute bottom-0.5 right-1"
      :class="{ ' text-red-400': currentNumber === parseInt(max) }">{{ currentNumber }} / {{ max }}</span>
  </div>
</template>

<script>
// 单行输入框
const INPUT = 'input'
// 多行输入框
const TEXTAREA = 'textarea'
</script>

<script setup>
import { computed } from 'vue'

// vue3.4新语法 替代v-model的
const text = defineModel({ required: true, type: String })
// 记录输入文本长度
const currentNumber = computed(() => text.value.length)
const props = defineProps({
  type: {
    type: String,
    default: INPUT,
    validator(val) {
      const typeArr = [INPUT, TEXTAREA]
      const isIN = typeArr.includes(val)
      if (!isIN) {
        throw new Error(`type 必须是 ${typeArr.join('、')} 中的一种！`)
      }
      return isIN
    }
  },
  // 输入最大长度
  max: {
    type: [String, Number]
  }
})
</script>

<style lang='scss' scoped></style>
