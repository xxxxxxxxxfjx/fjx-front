import axios from 'axios'
import { useUserStore } from '@/stores/user'
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
    console.error(err)
    const msg = err.data?.message
    console.log(msg)
  }
)

export default service
