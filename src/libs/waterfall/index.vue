<template>
  <div class=" relative" ref="container" :style="{ height: containerHeight + 'px' }">
    <template v-if="data?.length && containerWidth">
      <div class="waterfall-item absolute duration-300" v-for="(item, index) in data"
        :key="nodeKey ? item[nodeKey] : index"
        :style="{ top: item?._style?.top + 'px', left: item?._style?.left + 'px', width: columnWidth + 'px' }">
        <slot :item="item" :width="columnWidth" :index="index" />
      </div>
    </template>
    <div v-else>
      加载中...
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, nextTick, onUnmounted } from 'vue'
import { getImgElement, getAllImg, onComplateImgs, getMinPosition, getMinHeight, getMaxHeight } from './utils'

const props = defineProps({
  // 数据源
  data: {
    type: Array,
    required: true
  },
  // 指定的数据源的key
  nodeKey: {
    type: String
  },
  // 列数
  columns: {
    default: 2,
    type: Number
  },
  // 列间距
  columnSpacing: {
    default: 20,
    type: Number
  },
  // 行间距
  rowSpacing: {
    default: 20,
    type: Number
  },
  // 图片预预读取
  picturePreReading: {
    type: Boolean,
    default: true
  },
})

// 容器的高度
const containerHeight = ref(0)
// 容器中每一列的高度
const columnsHeightObj = ref({})
// 创建记录各列高度的一个对象
const useColumnsHeightObj = () => {
  columnsHeightObj.value = {}
  for (let i = 0; i < props.columns; i++) {
    columnsHeightObj.value[i] = 0
  }
}


// 容器实例
const container = ref(null)
// 容器的总宽度 容器总宽度(不包含 padding、margin、border)
const containerWidth = ref(0)
// 容器左边距 padding-left
const containerLeft = ref(0)
// 计算容器的宽度
const useContainerWidth = () => {
  const { paddingRight, paddingLeft } = getComputedStyle(container.value, null)
  containerLeft.value = parseFloat(paddingLeft)
  containerWidth.value = container.value.clientWidth - parseInt(paddingRight) - parseInt(paddingLeft)
}


// 列宽
const columnWidth = ref(0)
// 列间距总宽度 = 列数 * 列间距
const columnSpacingTotal = computed(() => {
  return (props.columns - 1) * props.columnSpacing
})
// 计算列宽
const useColumnWidth = () => {
  useContainerWidth()
  columnWidth.value = (containerWidth.value - columnSpacingTotal.value) / props.columns
  // console.log(columnWidth.value);
}

onMounted(() => {
  useColumnWidth()
})


// item高度
let itemHeight = []
// 需要图片预加载
const waitImgsPreReading = () => {
  itemHeight = []
  // 获取每一个item元素
  let itemElements = [...document.getElementsByClassName('waterfall-item')]
  // 获取所有的img元素
  const imgElements = getImgElement(itemElements)
  // 获取图片链接
  const allImgs = getAllImg(imgElements)
  onComplateImgs(allImgs).then(() => {
    // 图片加载完成
    itemElements.forEach(el => {
      console.log(el.offsetHeight);
      itemHeight.push(el.offsetHeight)
    })
    useItemLocation()
  })
}

// 不需要图片预加载
const useItemHeight = () => {
  itemHeight = []
  let itemElements = [...document.getElementsByClassName('waterfall-item')]
  itemElements.forEach(el => {
    itemHeight.push(el.offsetHeight)
  })
  useItemLocation()
}


const useItemLocation = () => {
  props.data.forEach((item, index) => {
    // 存在则直接返回
    if (item._style) {
      return
    }
    // 计算left 、top
    item._style = {}
    // debugger
    item._style.top = getItemTop()
    item._style.left = getItemLeft()
    // console.log(item._style);
    // 指定列高度自增
    // debugger
    increasingHeight(index)
  })
  // 更新容器高度
  containerHeight.value = getMaxHeight(columnsHeightObj.value)
}

// 计算获取left ： 最小高度列的index *（列宽+列间距）
const getItemLeft = () => {
  const columnIndex = getMinPosition(columnsHeightObj.value)
  return columnIndex * (columnWidth.value + props.columnSpacing) + containerLeft.value
}

// 计算获取top :最小高度即可
const getItemTop = () => {
  return getMinHeight(columnsHeightObj.value)
}

// 重新计算指定列的高度
const increasingHeight = (index) => {
  const columnIndex = getMinPosition(columnsHeightObj.value)
  columnsHeightObj.value[columnIndex] = +(columnsHeightObj.value[columnIndex]) + itemHeight[index] + props.rowSpacing
}

// 组件卸载后删除_style属性
onUnmounted(() => {
  props.data.forEach(item => {
    delete item._style
  })
})


watch(() => props.data, (v) => {
  // 重置列高度
  const resetColumnsHeight = v.every(item => !item._style)
  if (resetColumnsHeight) {
    useColumnsHeightObj()
  }
  nextTick(() => {
    if (props.picturePreReading) {
      // console.log(document.getElementsByClassName('waterfall-item'));
      waitImgsPreReading()
      console.log(itemHeight);
    } else {
      useItemHeight()
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
    })
  }, 200)
}

watch(() => props.columns, v => {
  if (props.picturePreReading) {
    containerWidth.value = 0
    nextTick(reset())
  } else {
    reset()
  }
  // containerWidth.value = 0
  // nextTick(reset())
})
</script>

<style lang='scss' scoped></style>
