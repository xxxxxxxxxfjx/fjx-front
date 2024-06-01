import { ref } from 'vue'
import { defineStore } from 'pinia'
import { postLoginApi, getUserInfoApi } from '@/services/modules/sys.js'

import { TOKEN, USER_INFO } from '@/constants'
import { setItem, getItem, removeItem } from '@/utils/store'

const defaultInfo = {
  token: getItem(TOKEN) || '',
  userInfo: getItem(USER_INFO) || {}
}
console.log(defaultInfo)

const useUserStore = defineStore('user', () => {
  const token = ref(defaultInfo.token)
  const userInfo = ref(defaultInfo.userInfo)

  function setToken(t) {
    token.value = t
    setItem(TOKEN, t)
  }
  function setUserInfo(info) {
    userInfo.value = info
  }
  function $reset() {
    token.value = ''
    userInfo.value = {}
    removeItem(TOKEN)
    removeItem(USER_INFO)
  }
  async function postUserLoginApi(payloads) {
    const res = await postLoginApi(payloads)
    // console.log(res)
    setToken(res.token)
    return true
  }

  async function getUserInfosApi() {
    const res = await getUserInfoApi()
    userInfo.value = res
    setItem(USER_INFO, res)
    return res
  }

  return {
    token,
    userInfo,
    setUserInfo,
    setToken,
    $reset,
    getUserInfosApi,
    postUserLoginApi
  }
})

export { useUserStore }
