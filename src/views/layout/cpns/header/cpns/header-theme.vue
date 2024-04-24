<template>
  <e-popover class="mr-2">
    <template #reference="props">
      <fjx-svg-icon :name="mainTheme"
        class="w-4 h-4 p-1 cursor-pointer rounded-sm outline-none duration-150 hover:bg-zinc-100/60 dark:hover:bg-zinc-900"
        fillClass="text-zinc-900 dark:fill-zinc-300"></fjx-svg-icon>
    </template>
    <div class="w-[140px] overflow-hidden">
      <div class="flex items-center p-1 cursor-pointer rounded hover:bg-zinc-100/60 dark:hover:bg-zinc-800"
        v-for="item in theme" :key="item.id" @click="handleClickTheme(item)">
        <fjx-svg-icon :name="item.icon" class="w-1.5 h-1.5 mr-1"
          fillClass="fill-zinc-900 dark:fill-zinc-300"></fjx-svg-icon>
        <span class="text-zinc-800 text-sm dark:text-zinc-300">{{ item.name }}</span>
      </div>
    </div>
  </e-popover>
</template>

<script setup>
import { computed } from 'vue'
import { useThemeStore } from "@/stores/theme.js"
import { THEME_DARK, THEME_LIGHT, THEME_SYSTEM } from "@/constants"

const theme = [
  {
    id: 0,
    type: THEME_LIGHT,
    icon: 'theme-light',
    name: '极简白'
  }, {
    id: 1,
    type: THEME_DARK,
    icon: 'theme-dark',
    name: '极夜黑'
  }, {
    id: 2,
    type: THEME_SYSTEM,
    icon: 'theme-system',
    name: '跟随系统'
  },
]

const themeStore = useThemeStore()
const mainTheme = computed(() => {
  return theme.find(item => item.type === themeStore.theme).icon
})
const handleClickTheme = (item) => {
  console.log(item);
  themeStore.setTheme(item.type)
}

</script>

<style lang='scss' scoped></style>
