import { ref } from 'vue'
import { defineStore } from 'pinia'
import { CATEGORY, CATEGORY_NOMAR_DATA, ALL_CATEGORY } from '@/constants'
import { getItem, setItem } from '@/utils/store'
import { getCategory } from '@/services/modules/app'
import * as _ from 'lodash'
import { isMobileTerminal } from '@/utils/flexiable'

const defaultConfig = {
  category: getItem(CATEGORY) || CATEGORY_NOMAR_DATA
}
const useAppStore = defineStore('app', () => {
  // 页面过度状态
  const routerType = ref('none')
  // 搜索文本
  const searchText = ref('')
  // 主题类别
  const category = ref(defaultConfig.category)
  // 当前选中的类别
  const currentCategory = ref(ALL_CATEGORY)
  // 当前选中的类别下标index
  const currentCategoryIndex = ref(0)

  // 设置当前选中的类别和下标index
  function setCurrentCategory(item) {
    currentCategory.value = item
    currentCategoryIndex.value = category.value.findIndex(
      (t) => t.id === item.id
    )
  }
  // 设置router状态
  function setRouterType(type) {
    routerType.value = type
  }
  // 获取router状态
  function getRouterType() {
    // pc端就返回none
    if (!isMobileTerminal.value) {
      return 'none'
    }
    return routerType.value
  }
  /**
   * 设置搜索文本
   * @param {String} text
   */
  function setSearchText(text) {
    searchText.value = text
  }

  /**
   * 获取类别
   */
  async function getCategoryApi() {
    const res = await getCategory()
    // console.log(res)

    category.value = _.uniqBy([...category.value, ...res.categorys], 'id')
    setItem(CATEGORY, category.value)
    return category.value
  }
  return {
    routerType,
    searchText,
    category,
    currentCategory,
    currentCategoryIndex,
    setRouterType,
    getRouterType,
    setSearchText,
    setCurrentCategory,
    getCategoryApi
  }
})
export { useAppStore }
