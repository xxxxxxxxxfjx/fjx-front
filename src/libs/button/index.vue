<template>
  <button class="text-sm text-center rounded flex justify-center items-center duration-150" :class="[typeEnum[type], sizeEnum[sizeKey].button, {
    'activate:scale-105': isActivateAnimation, 'rounded-full': rounded
  }]" @clike.stop="handleClick">
    <fjx-svg-icon v-if="loading" name="loading" class=" w-2 h-2 animate-spin mr-1"></fjx-svg-icon>
    <fjx-svg-icon v-if="icon" :name="icon" class="m-auto" :class="sizeEnum[sizeKey].icon" :color="iconColor"
      :fillClass="iconClass"></fjx-svg-icon>
    <slot v-else />
  </button>
</template>

<script>
// 定义按钮类型
const typeEnum = {
  primary: 'text-white  bg-zinc-800 hover:bg-zinc-900 active:bg-zinc-800 dark:bg-zinc-900   dark:hover:bg-zinc-700  dark:active:bg-zinc-700',
  main: 'text-white  bg-main hover:bg-hover-main active:bg-main dark:bg-zinc-900  dark:hover:bg-zinc-700  dark:active:bg-zinc-700',
  info: 'text-zinc-800 bg-zinc-200 hover:bg-zinc-300 active:bg-zinc-200 dark:text-zinc-300   dark:bg-zinc-700  dark:hover:bg-zinc-600  dark:active:bg-zinc-700'
}

// 定义按钮大小
const sizeEnum = {
  default: {
    button: 'w-8 h-4 text-base',
    icon: ''
  },
  'icon-default': {
    button: 'w-4 h-4',
    icon: 'w-1.5 h-1.5'
  },
  small: {
    button: 'w-7 h-3 text-base',
    icon: ''
  },
  'icon-small': {
    button: 'w-3 h-3',
    icon: 'w-1.5 h-1.5'
  }
}
</script>

<script setup>
import { computed } from 'vue'
import fjxSvgIcon from "@/libs/svg-icon/index.vue"



const props = defineProps({
  icon: {
    type: String
  },
  iconColor: {
    type: String,
  },
  iconClass: {
    type: String
  },
  // 按钮类型
  type: {
    type: String,
    default: 'main',
    validator(value) {
      const isOK = Object.keys(typeEnum).includes(value);
      if (!isOK) {
        throw new Error(`type 必须是 ${Object.keys(typeEnum).join('、')} 中的一个`)
      }
      return isOK
    }
  },
  // 按钮大小
  size: {
    type: String,
    default: 'default',
    validator(value) {
      const keys = Object.keys(sizeEnum).filter(key => !key.includes('icon'))
      const isOK = keys.includes(value);
      if (!isOK) {
        throw new Error(`size 必须是 ${keys.join('、')} 中的一个`)
      }
      return isOK
    }
  },
  isActivateAnimation: {
    type: Boolean,
    default: true
  },
  loading: {
    type: Boolean,
    default: false
  },
  rounded: {
    type: Boolean,
    default: false
  }
})


const sizeKey = computed(() => {
  return props.icon ? 'icon-' + props.size : props.size
})


const handleClick = () => {
  console.log(1);
}
</script>

<style lang='scss' scoped></style>
