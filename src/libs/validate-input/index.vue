<template>
  <div class="relative leading-[0]">
    <input v-model="data" type="text" @blur="handleBlur" :maxlength="max" :placeholder="placeholder"
      class=" w-full outline-0 border border-gray-400 py-0.5 px-1 rounded-sm text-sm text-zinc-900 bg-white dark:text-white dark:bg-zinc-900 focus:border-blue-400 ">
    <span v-if="isVisiable && rules" class=" font-bold text-xs absolute -bottom-1.5 left-0 text-red-400">{{ message
      }}</span>
    <span v-if="max && rules" class="text-xs absolute right-1 bottom-0.5 text-gray-400"
      :class="{ ' text-red-400': currentNumber === parseInt(max) }">{{ currentNumber }} /
      {{ max }}</span>
  </div>
</template>


<script>
// 必须填写
const REQUIRED = 'require'
// 邮箱
const EMAIL = 'email'
// 最大长度
const MAX = 'max'
// 最小长度
const MIN = 'min'
</script>

<script setup>
import { computed, ref, watchEffect } from 'vue'
const props = defineProps({
  // 验证规则
  rules: {
    type: Array,
    default: [],
    validator(arr) {
      console.log(arr);
      const rulesType = [REQUIRED, EMAIL, MAX, MIN]
      const isIn = arr.some(item => {
        return rulesType.includes(item)
      })
      if (!isIn) {
        return new Error(`验证规则应该是 ${rulesType.join("、")}其中之一！`)
      }
      return isIn
    }
  },
  placeholder: {
    type: String
  }
})

// 输入数据
const data = defineModel({ required: true, type: String })



// 控制错误提示显示
const isVisiable = ref(false)
const message = ref("")

const validate = (rule, value) => {
  switch (rule.type) {
    case REQUIRED:
      return value.length > 0
    case EMAIL:
      return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        value
      )
    case MAX:
      return value.length <= rule.value
    case MIN:
      return value.length >= rule.value
  }
}

// 失去焦点时校验
const handleBlur = () => {
  // 遍历规则
  for (const rule of props.rules) {
    console.log(data.value);
    const res = validate(rule, data.value)
    if (!res) {
      isVisiable.value = true
      message.value = rule.message
      return
    }
  }
  isVisiable.value = false
  message.value = ""
}
// 最大长度
const max = computed(() => {
  return props.rules.find(item => item.type === MAX)?.value
})
// 输入数据的长度
const currentNumber = computed(() => {
  return data.value.length
})
watchEffect(() => {
  console.log(data.value);
  console.log(max.value, currentNumber.value);
})
</script>

<style lang='scss' scoped></style>
