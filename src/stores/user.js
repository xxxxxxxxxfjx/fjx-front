import { ref } from 'vue'
import { defineStore } from 'pinia'
import { postLoginApi, getUserInfoApi } from '@/services/modules/sys.js'
import md5 from 'md5'
import { TOKEN } from '@/constants'
import { setItem, getItem } from '@/utils/store'

const defaultInfo = {
  token: getItem(TOKEN) || ''
}

const useUserStore = defineStore('user', () => {
  const token = ref(defaultInfo.token)

  function setToken(t) {
    token.value = t
    setItem(TOKEN, t)
  }
  async function postUserLoginApi(payloads) {
    try {
      const res = await postLoginApi({
        ...payloads,
        password: md5(payloads.password)
      })
      // console.log(res)
      setToken(res.token)
      return true
    } catch {
      return false
    }
  }

  async function getUserInfosApi() {
    const res = await getUserInfoApi()
  }

  return { token, setToken, getUserInfosApi, postUserLoginApi }
})

export { useUserStore }
