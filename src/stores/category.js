import { ref } from 'vue'
import { defineStore } from 'pinia'
import { CATEGORY, CATEGORY_NOMAR_DATA, ALL_CATEGORY } from '@/constants'
import { getItem, setItem } from '@/utils/store'
import { getCategory } from '@/services/modules/category'
import * as _ from 'lodash'

const defaultConfig = {
  category: getItem(CATEGORY) || CATEGORY_NOMAR_DATA
}
const useCategoryStore = defineStore('category', () => {
  const category = ref(defaultConfig.category)
  const currentCategory = ref(ALL_CATEGORY)
  const currentCategoryIndex = ref(0)

  // 设置当前选中的类别和下标index
  function setCurrentCategory(item) {
    currentCategory.value = item
    currentCategoryIndex.value = category.value.findIndex(
      (t) => t.id === item.id
    )
  }

  async function getCategoryApi() {
    const res = await getCategory()
    // console.log(res)

    category.value = _.uniqBy([...category.value, ...res.categorys], 'id')
    setItem(CATEGORY, category.value)
    return category.value
  }
  return {
    category,
    currentCategory,
    currentCategoryIndex,
    setCurrentCategory,
    getCategoryApi
  }
})
export { useCategoryStore }
