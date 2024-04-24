<template>
  <div class=" relative" ref="container" :style="{ height: containerHeight + 'px' }">
    <template v-if="data.length && containerWidth">
      <div class="item absolute duration-300" v-for="(item, index) in data" :key="nodeKey ? item[nodeKey] : index"
        :style="{ top: item._style?.top + 'px', left: item._style?.left + 'px', width: columnWidth + 'px' }">
        <slot :item="item" :width="columnWidth" :index="index" />
      </div>
    </template>
    <div v-else class="text-base text-zinc-400 text-center">数据加载中...</div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, nextTick, onUnmounted } from 'vue'
import { getImgElements, getAllImgs, onComplateLoading, getMinHeight, getMaxHeight, getMinHeightIndex } from "./utils"
import { property } from 'lodash';


const props = defineProps({
  // 渲染数据
  data: {
    type: Array,
    required: true
  },
  // 指定数据的键
  nodeKey: {
    type: String,
  },
  columns: {
    type: Number,
    default: 2
  },
  columnSpacing: {
    type: Number,
    default: 20
  },
  rowSpacing: {
    type: Number,
    default: 20
  },
  picturePreReading: {
    type: Boolean,
    default: true
  }
})

const container = ref(null)
// 容器宽度
const containerWidth = ref(0)
// 容器高度
const containerHeight = ref(0)
// 容器左内边距
const containerLeft = ref(0)
// 计算容器宽度
const useContainerWidth = () => {
  const { paddingLeft, paddingRight } = getComputedStyle(container.value, null)
  containerLeft.value = parseFloat(paddingLeft)
  containerWidth.value = container.value.clientWidth - parseFloat(paddingLeft) - parseFloat(paddingRight)
}

// 列宽
const columnWidth = ref(0)
// 记录列长
const columnsHeight = ref({})
// 初始化列长
const useColumnsHeight = () => {
  columnsHeight.value = {}
  for (let i = 0; i < props.columns; i++) {
    columnsHeight.value[i] = 0
  }
}
//计算总间距的宽度
const columnSpacingTotal = computed(() => {
  return (props.columns - 1) * props.columnSpacing
})
const useColumnWidth = () => {
  useContainerWidth()
  columnWidth.value = (containerWidth.value - columnSpacingTotal.value) / props.columns
}


onMounted(() => {
  useColumnWidth()
  // console.log(containerWidth.value);
  // console.log(columnWidth.value);
})


let itemsHeight = []
// 图片预加载
const usePicturePreReading = async () => {
  itemsHeight = []
  // 获取所有的item
  const items = [...document.querySelectorAll('.item')]
  // 获取所有的img元素
  const imgElements = getImgElements(items)
  // 获取所有的img链接
  const allImgs = getAllImgs(imgElements)
  // 预加载
  await onComplateLoading(allImgs)
  items.forEach(el => {
    itemsHeight.push(el.offsetHeight)
  })
  // 计算item位置
  useItemLocation()
}

// 图片不进行预加载
const useItemsHeight = () => {
  itemsHeight = []
  // 获取所有的item
  const items = [...document.querySelectorAll('.item')]
  items.forEach(el => {
    itemsHeight.push(el.offsetHeight)
  })
  // 计算item位置
  useItemLocation()
}

// 计算item的位置
const useItemLocation = () => {
  console.log(itemsHeight);
  props.data.forEach((item, index) => {
    if (item._style) {
      return
    }
    // 计算item位置
    item._style = {}
    item._style.top = getItemTop()
    item._style.left = getItemLeft()

    // 变更存储高度的对象
    increasingHeight(index)
  })
  console.log(props.data);
  // 更新容器高度
  containerHeight.value = getMaxHeight(columnsHeight.value)
}
// 获取item距离顶部的位置
const getItemTop = () => {
  const minHeight = getMinHeight(columnsHeight.value)
  return minHeight
}
// 获取item距离左侧的位置
const getItemLeft = () => {
  const minIndex = getMinHeightIndex(columnsHeight.value)
  return minIndex * (columnWidth.value + props.columnSpacing) + containerLeft.value
}

// 更新高度对象数据
const increasingHeight = (index) => {
  const minIndex = getMinHeightIndex(columnsHeight.value)
  columnsHeight.value[minIndex] = columnsHeight.value[minIndex] + itemsHeight[index] + props.rowSpacing
}

onUnmounted(() => {
  props.data.forEach(item => {
    delete item._style
  })
})


watch(() => props.data, v => {
  const reset = v.every(item => !item._style)
  if (reset) {
    useColumnsHeight()
  }
  nextTick(() => {
    if (props.picturePreReading) {
      usePicturePreReading()
    } else {
      useItemsHeight()
    }
  })
}, {
  deep: true,
  immediate: true
})

const reset = () => {
  setTimeout(() => {
    useColumnWidth()
    props.data.forEach(item => {
      item._style = null
    }, 200)
  })
}

watch(() => props.columns, v => {
  if (props.picturePreReading) {
    containerWidth.value = 0
    nextTick(reset())
  } else {
    reset()
  }
})


</script>

<style lang='scss' scoped></style>
