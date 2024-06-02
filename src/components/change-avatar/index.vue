<template>
  <div class=" overflow-auto flex flex-col items-center">
    <fjx-svg-icon v-if="isMobileTerminal" name="close" class="w-3 h-3 p-0.5 ml-auto m-1"
      fillClass="fill-zinc-900 dark:fill-zinc-200 " @click="handleClose"></fjx-svg-icon>
    <img :src="blob" alt="" class="mb-2" ref="imageTarget">
    <fjx-button class="my-2 w-[80%] xl:w-1/2" @click="handleConfirm" :loading="loading">确定</fjx-button>
  </div>
</template>

<script>
const EMIT_CLOSE = 'close'
// PC端裁剪配置项
const pcOptions = {
  aspectRatio: 1
}
// 移动端配置对象
const mobileOptions = {
  // 将裁剪框限制在画布的大小
  viewMode: 1,
  // 移动画布，裁剪框不动
  dragMode: 'move',
  // 裁剪框固定纵横比：1:1
  aspectRatio: 1,
  // 裁剪框不可移动
  cropBoxMovable: false,
  // 不可调整裁剪框大小
  cropBoxResizable: false
}

</script>

<script setup>
import { ref, onMounted } from 'vue'
import { isMobileTerminal } from '@/utils/flexiable';
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'
import { getOSSClient } from "@/utils/sts"
import { message } from '@/libs';
import { useUserStore } from '@/stores/user';

defineProps({
  blob: {
    type: String,
    required: true
  }
})
const emits = defineEmits([EMIT_CLOSE])

const userStore = useUserStore()

const handleClose = () => { emits(EMIT_CLOSE) }

const loading = ref(false)

// 获取图片元素
const imageTarget = ref(null)
// 进行裁剪
let cropper = null
onMounted(() => {
  cropper = new Cropper(imageTarget.value, isMobileTerminal.value ? mobileOptions : pcOptions);
})

const handleConfirm = () => {
  // 生成blob对象
  cropper.getCroppedCanvas().toBlob(blob => {
    upload(blob)
  })
}

// oss上传
let OSSClient
const upload = async (file) => {
  if (!OSSClient) {
    OSSClient = await getOSSClient()
  }
  try {
    loading.value = true
    const fileTypeArr = file.type.split('/')
    const filename = `${userStore.userInfo.username}/${Date.now()}.${fileTypeArr[fileTypeArr.length - 1]}`
    await OSSClient.put(`images/${filename}`, file)
  } catch (error) {
    message('error', error)
  } finally {
    loading.value = false
  }
}

</script>

<style lang='scss' scoped></style>
