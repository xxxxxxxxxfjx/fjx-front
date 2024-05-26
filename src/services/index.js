import axios from 'axios'
import { useUserStore } from '@/stores/user'
import { message } from '@/libs'

const service = axios.create({
  timeout: 5000,
  baseURL: import.meta.env.VITE_BASE_API
})

// 请求拦截器
service.interceptors.request.use((config) => {
  const userStore = useUserStore()
  if (userStore.token) {
    // 如果token存在 注入token
    config.headers.Authorization = `Bearer ${userStore.token}`
  }
  config.headers.icode = 'helloqianduanxunlianying'
  return config // 必须返回配置
})

service.interceptors.response.use(
  (res) => {
    // console.log(res.data)
    const { success, code, message, data } = res.data
    if (success && code === 200) {
      return data
    } else {
      return Promise.reject(new Error(message))
    }
  },
  (err) => {
    // 处理token超时
    if (err.response && err.response.data && err.response.data.code === 401) {
      const userStore = useUserStore()
      userStore.$reset()
      location.reload()
      message('error', err.response.data.message)
    }
    return Promise.reject(err)
  }
)

export default service
