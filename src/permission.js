import router from '@/router/index.js'
import { useUserStore } from '@/stores/user'
import { message } from './libs'

router.beforeEach((to, from) => {
  const useStore = useUserStore()
  // 不用登录就可以直接访问的页面
  if (!to.meta.user) {
    return true
  }
  // 用户已登录
  if (useStore.token) {
    return true
  }
  message('warn', '用户登录已过期，请重新登录')
  return '/'
})
