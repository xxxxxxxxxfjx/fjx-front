import { ref } from 'vue'
import { defineStore } from 'pinia'
import { CATEGORY } from '@/constants'
import { getItem, setItem } from '@/utils/store'
import { getCategory } from '@/services/modules/category'

const defaultConfig = {
  category: getItem(CATEGORY) || []
}
const useCategoryStore = defineStore('category', () => {
  const category = ref(defaultConfig.category)

  async function getCategoryApi() {
    const res = await getCategory()
    category.value = res.categorys
    setItem(CATEGORY, res.categorys)
    return res.categorys
  }
  return { category, getCategoryApi }
})
export { useCategoryStore }
