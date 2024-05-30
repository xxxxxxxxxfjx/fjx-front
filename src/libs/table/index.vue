<template>
  <div class=" w-full text-sm rounded-tl-sm rounded-tr-sm overflow-hidden">
    <!-- 表头 -->
    <table ref="headerRef" class=" w-full">
      <thead class="">
        <tr class=" flex py-1 border-b border-b-gray-200" :class="{ ' bg-gray-100': headerColor === '' }"
          :style="{ backgroundColor: headerColor }">
          <th v-if="serialNumber" class=" w-[70px] font-semibold text-center truncate px-1 border-r border-r-gray-300">
            序号</th>
          <th v-for="( column, index ) in  columns " :key="column.key ? column.key : index"
            class=" flex-1 font-semibold flex justify-start truncate px-1 border-r border-r-gray-300 last:border-r-0">
            {{ column.title }}</th>
        </tr>
      </thead>
    </table>
    <!-- 数据 -->
    <div :style="{ height: height }"
      class="overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-900 scrollbar-track-transparent">
      <table class=" w-full ">
        <tbody class="w-full">
          <tr class="  flex py-1 border-b border-b-gray-200 hover:bg-gray-100 duration-300 overflow-hidden"
            :class="isStripe" v-for="( row, index ) in  dataSource " :key="index" @click="handleClickRow(row)">
            <td v-if="serialNumber" class=" w-[70px] text-center font-normal truncate px-1 ">{{ index + 1 }}</td>
            <template v-for=" column  in  columns " :key="column.key">
              <td v-if="!column.slots" class=" flex-1 flex justify-start  px-1 overflow-hidden border">{{
            row[column.key] }}
              </td>
              <td v-else class=" flex-1 flex justify-start  px-1 overflow-hidden border">
                <slot :name="column['slots']" :row="row" />
              </td>
            </template>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
const EMIT_CLICK_ROW = 'clickRow'
</script>

<script setup>
import { ref, computed } from 'vue'

// 定义事件
const emits = defineEmits([EMIT_CLICK_ROW])
// 定义属性
const props = defineProps({
  // 表头
  columns: {
    type: Array,
    required: true,
    default: [],
    validate(arr) {
      const flag = arr instanceof Array
      if (!flag) {
        throw new Error('columns是一个数组！')
      }
      return flag
    }
  },
  // 表数据
  dataSource: {
    // 表数据
    required: true,
    default: [],
    type: Array,
    validate(arr) {
      const flag = arr instanceof Array
      if (!flag) {
        throw new Error('dataSource是一个数组！')
      }
      return flag
    }
  },
  // 行索引
  serialNumber: {
    type: Boolean,
    default: false
  },
  // 表头颜色
  headerColor: {
    type: String,
    default: ''
  },
  // 是否开启斑马条纹
  stripe: {
    type: Boolean,
    default: false
  },
  // 高度设置
  height: {
    type: [String, Number],
  },
})

// 斑马纹样式计算
const isStripe = computed(() => {
  if (props.stripe) {
    return 'even:bg-gray-100'
  } else {
    return ''
  }
})

// 表头
const headerRef = ref(null)

// 计算数据区域的高度
const height = computed(() => {
  if (headerRef.value) {
    const { height } = getComputedStyle(headerRef.value)
    return parseInt(props.height) - parseInt(height) + 'px'
  }
  return 'inherit'
})
// 行点击事件
const handleClickRow = (row) => {
  emits(EMIT_CLICK_ROW, row)
}

</script>

<style lang='scss' scoped></style>
