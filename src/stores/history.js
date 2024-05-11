import { ref } from 'vue'
import { defineStore } from 'pinia'
import { HISTORY } from '@/constants'
import { getItem, setItem, removeItem } from '@/utils/store'

const deafault = {
  history: getItem(HISTORY) || []
}

const useHistoryStore = defineStore('history', () => {
  const history = ref(deafault.history)

  // 新增历史记录
  function addHistory(item) {
    const index = history.value.findIndex((i) => i === item)
    if (index !== -1) {
      history.value.splice(index, 1)
    }
    history.value.unshift(item)
    setItem(HISTORY, history.value)
  }
  // 删除指定历史记录
  function deleteHistory(index) {
    history.value.splice(index, 1)
    setItem(HISTORY, history.value)
  }
  // 删除所有历史记录
  function deleteAllHistory() {
    history.value = []
    removeItem(HISTORY)
  }

  return { history, addHistory, deleteHistory, deleteAllHistory }
})

export { useHistoryStore }
