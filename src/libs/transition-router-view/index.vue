<template>
  <router-view v-slot="{ Component }">
    <transition :name="transitionName" @before-enter="beforeEnter" @after-leave="afterLeave">
      <keep-alive :include="virtualTaskStack">
        <component :class="{ ' fixed top-0 left-0 w-screen z-50': isAnimation }" :is="Component" />
      </keep-alive>
    </transition>
  </router-view>
</template>

<script>

// 路由状态 PC端是没有状态的 移动端是进入和退出两种状态啊
const NONE = 'none'
const ROUTER_TYPE_PUSH = 'push'
const ROUTER_TYPE_BACK = 'back'
const ROUTER_TYPE_ENUM = [NONE, ROUTER_TYPE_PUSH, ROUTER_TYPE_BACK]
</script>

<script setup>
import { ref } from 'vue'
import { useRouter } from "vue-router"
import { useAppStore } from '@/stores/app'

const appStore = useAppStore()
const transitionName = ref('')
const props = defineProps({
  // 路由状态
  routerType: {
    type: String,
    default: NONE,
    validator: (value) => {
      const isOk = ROUTER_TYPE_ENUM.includes(value)
      if (!isOk) {
        throw new Error(`routerType 必须是 ${ROUTER_TYPE_ENUM.join('、')} 其中之一！`)
      }
      return isOk
    }
  },
  // 首页
  mainComponent: {
    type: String,
    required: true
  }
})


// 创建虚拟任务栈
const virtualTaskStack = ref([props.mainComponent])
// 清空栈
const clearStack = () => {
  virtualTaskStack.value = [props.mainComponent]
}

const router = useRouter()
router.beforeEach((to, from) => {
  // 获取router类型
  transitionName.value = appStore.getRouterType()

  if (props.routerType === ROUTER_TYPE_PUSH) {
    // 添加到虚拟任务栈
    virtualTaskStack.value.push(to.name)
  } else if (props.routerType === ROUTER_TYPE_BACK) {
    // 删除虚拟任务栈
    virtualTaskStack.value.pop()
  }

  // 回到首页默认清空虚拟任务栈
  if (to.name === props.mainComponent) {
    clearStack()
  }

})




// 设置动画状态，添加样式
const isAnimation = ref(false)
const beforeEnter = () => {
  isAnimation.value = true
}
const afterLeave = () => {
  isAnimation.value = false
}
</script>

<style lang='scss' scoped>
.push-enter-active {
  animation: push-in 0.5s;
}

// push状态中进入的页面的动画
@keyframes push-in {
  0% {
    transform: translateX(100%);
  }

  100% {
    transform: translateX(0%);
  }
}

// push状态中退出的页面的动画
.push-leave-active {
  animation: push-out 0.5s;
}

@keyframes push-out {
  0% {
    transform: translateX(0%);
  }

  100% {
    transform: translateX(-50%);
  }
}

.back-enter-active {
  animation: back-in 0.5s;
}

// back状态中进入的页面的动画
@keyframes back-in {
  0% {
    transform: translateX(-100%);
  }

  100% {
    transform: translateX(0%);
  }
}

.back-leave-active {
  animation: back-out 0.5s;
}

// back状态中退出的页面的动画
@keyframes back-out {
  0% {
    transform: translateX(00%);
  }

  100% {
    transform: translateX(50%);
  }
}
</style>
