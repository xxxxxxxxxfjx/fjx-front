<template>
  <div ref="containerRef"
    class="group w-full  rounded-xl p-0.5   relative duration-500 hover:border-red-100 flex hover:bg-red-100/45">
    <div class="w-full">
      <fjx-svg-icon name="search" color="#707070"
        class="w-1.5 h-1.5 absolute top-[50%] translate-y-[-50%] left-2"></fjx-svg-icon>
      <input v-model="inputValue" type="text"
        class=" block w-full h-[44px] pl-4 outline-0 bg-zinc-100 caret-zinc-400 rounded-xl
         text-zinc-900 tracking-wide font-semibold border border-zinc-100 duration-500 text-sm
        group-hover:bg-white group-hover:border-zinc-200 focus:border-red-300 dark:bg-zinc-800  dark:text-zinc-200  dark:border-zinc-700  dark:group-hover:bg-zinc-900 dark:group-hover:border-zinc-700"
        placeholder="搜索" @focus="onFocusHandlder" @blur="onBlurHandlder" @keyup.enter="onSearchHandlder">
      <fjx-svg-icon v-if="inputValue" name="input-delete" @click="onDeleteHandler"
        class="h-1.5 w-1.5 opacity-100 absolute top-[50%] translate-y-[-50%] right-9 duration-500 cursor-pointer"></fjx-svg-icon>
      <div
        class='w-[1px] h-1.5 bg-zinc-200 absolute top-[50%] translate-y-[-50%] right-[62px] duration-500 opacity-0 group-hover:opacity-100'>
      </div>
      <fjx-button @click="onSearchHandlder"
        class=" absolute right-1 top-[50%] translate-y-[-50%] group-hover:bg-red-400 opacity-0 duration-500 group-hover:opacity-100 rounded-full"
        icon="search" iconColor="#fff"></fjx-button>
    </div>
    <transition name="slide">
      <div v-if="slots.dropdown" v-show="inputFocus"
        class=" max-h-[368px] w-full text-base overflow-auto bg-white absolute z-20 left-0 top-[56px] p-2 rounded border border-zinx-200 duration-200 hover:shadow-3xl dark:bg-zinc-800  dark:border-zinc-600">
        <slot name="dropdown" />
      </div>
    </transition>
  </div>
</template>

<script>
// 出发搜索事件（回车/点击搜索按钮）
const EMIT_SEARCH = 'search'
// 触发清空类容事件
const EMIT_DELETE = 'delete'
// 触发输入事件
const EMIT_INPUT = 'input'
// 触发焦点事件
const EMIT_FOCUS = 'focus'
// 触发失去焦点事件
const EMIT_BLUR = 'blur'
</script>


<script setup>
import { onClickOutside } from "@vueuse/core"
import { ref, useSlots } from 'vue'

const emits = defineEmits([EMIT_SEARCH, EMIT_DELETE, EMIT_INPUT, EMIT_FOCUS, EMIT_BLUR])
// 插槽对象
const slots = useSlots()
// 数据绑定
const inputValue = defineModel()
// 是否聚焦
const inputFocus = ref(false)
// 触发搜索事件
const onSearchHandlder = () => {
  try {
    if (!inputValue.value.length) {
      return
    }
    emits(EMIT_SEARCH, inputValue.value)
  }
  catch (err) {

  }
}
// 触发删除输入类容
const onDeleteHandler = () => {
  inputValue.value = ''
}

// 触发获取焦点
const onFocusHandlder = () => {
  inputFocus.value = true
  emits(EMIT_FOCUS)
}

// 触发失去焦点
const onBlurHandlder = () => {
  emits(EMIT_BLUR)
}

// 点击区域外隐藏 dropdown
const containerRef = ref(null)
onClickOutside(containerRef, () => {
  inputFocus.value = false
})


</script>

<style lang='scss' scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all .6s;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateY(40px);
  opacity: 0;
}
</style>
