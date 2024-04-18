import { ref } from 'vue'
import { defineStore } from 'pinia'
import { CATEGORY, CATEGORY_NOMAR_DATA } from '@/constants'
import { getItem, setItem } from '@/utils/store'
import { getCategory } from '@/services/modules/category'
import * as _ from 'lodash'

const defaultConfig = {
  category: getItem(CATEGORY) || CATEGORY_NOMAR_DATA
}
const useCategoryStore = defineStore('category', () => {
  const category = ref(defaultConfig.category)

  async function getCategoryApi() {
    const res = await getCategory()
    // console.log(res)

    category.value = _.uniqBy([...category.value, ...res.categorys], 'id')
    setItem(CATEGORY, category.value)
    return category.value
  }
  return { category, getCategoryApi }
})
export { useCategoryStore }
