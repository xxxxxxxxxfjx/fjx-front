<template>
  <div>
    <div v-for="(item, index) in hintData" :key="index" @click="handleClick(item)" v-html="handleTextHighlight(item)"
      class="py-1 pl-1 rounded font-bold text-base text-zinc-500 cursor-pointer duration-200 hover:bg-zinc-200 dark:hover:bg-zinc-900">
    </div>
  </div>
</template>

<script>
const EMIT_HANDLE_CLICK = 'handleClick'
</script>

<script setup>
import { ref } from 'vue'
import { watchDebounced } from "@vueuse/core"
import { getPexelsHint } from "@/services/modules/pexels"

const props = defineProps({
  searchText: {
    type: String,
    required: true
  }
})
const emits = defineEmits([EMIT_HANDLE_CLICK])
const hintData = ref([])
const getHint = async () => {
  const { result } = await getPexelsHint(props.searchText)
  console.log(result)
  hintData.value = result
}
const handleClick = (item) => {
  emits(EMIT_HANDLE_CLICK, item)
}
const handleTextHighlight = (text) => {
  const str = `<span class="text-zinc-900 dark:text-zinc-200">${props.searchText}<span/>`
  const reg = new RegExp(props.searchText, 'gi')
  return text.replace(reg, str)
}


watchDebounced(
  () => props.searchText,
  getHint,
  { debounce: 500, immediate: true },
)


</script>

<style lang='scss' scoped></style>
