<template>
  <div ref="containerRef"
    class="h-full overflow-auto bg-white dark:bg-zinc-800 duration-500 scrollbar-thin scrollbar-thumb-transparent xl:scrollbar-thumb-zinc-200 xl:dark:scrollbar-thumb-zinc-900 scrollbar-track-transparent">
    <mobile-vue v-if="isMobileTerminal" v-model="data"></mobile-vue>
    <pc-vue v-else v-model="data"></pc-vue>
    <div class="max-w-screen-xl mx-auto realative m-1 xl:mt-4">
      <list-vue></list-vue>
    </div>
    <fjx-trigger-menu v-if="isMobileTerminal" class=" fixed bottom-5 m-auto left-0 right-0 w-[220px]">
      <fjx-trigger-menu-item icon="home" iconClass="w-2 h-2">
        首页
      </fjx-trigger-menu-item>
      <fjx-trigger-menu-item v-if="userStore.token" icon="vip" iconClass="w-2 h-2" @click="handleVIPClick">
        VIP
      </fjx-trigger-menu-item>
      <fjx-trigger-menu-item icon="profile" iconClass="w-2 h-2" @click="handleMyClick">
        {{ userStore.token ? '我的' : '登录' }}
      </fjx-trigger-menu-item>
    </fjx-trigger-menu>
  </div>
</template>

<script>
export default {
  name: "home"
}
</script>

<script setup>
import { ref, onActivated } from 'vue'
import { isMobileTerminal } from "@/utils/flexiable"
import { useAppStore } from "@/stores/app"
import { useUserStore } from '@/stores/user'
import MobileVue from "./cpns/mobile/index.vue"
import PcVue from "./cpns/pc/index.vue"
import ListVue from "@/components/list/index.vue"
import { useRouter } from 'vue-router'
import { useScroll } from '@vueuse/core'


console.log(isMobileTerminal.value);

const userStore = useUserStore()
const data = ref([])
const appStore = useAppStore()
const getCategoryData = async () => {
  data.value = await appStore.getCategoryApi()
}
getCategoryData()


const router = useRouter()
// 我的点击事件
const handleMyClick = () => {
  // 移动端下router跳转类型
  appStore.setRouterType('push')
  if (userStore.token) {
    router.push('/profile')
  } else {
    router.push('/login')
  }
}
// VIP的点击事件
const handleVIPClick = () => { }

console.log("home页面");




const containerRef = ref(null)
// 记录页面滚动位置
const { y: containerScrollY } = useScroll(containerRef)
// 激活页面时的回调
onActivated(() => {
  if (!containerRef.value) {
    return
  }
  containerRef.value.scrollTop = containerScrollY.value
})
</script>

<style lang='scss' scoped></style>
