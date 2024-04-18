<template>
  <div class="message-box">
    <Teleport to='body'>
      <div v-if="show" class=" w-screen h-screen bg-zinc-900/70 z-40 fixed top-0 left-0" @click="show = false">
        <div
          class="absolute z-50 w-[420px] min-h-[120px] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white p-1 rounded-sm">
          <div class="header flex items-center">
            <div style="flex:1">
              <slot name="header">
                <span class="text-sm">标题</span>
              </slot>
            </div>
            <fjx-button icon="close" class="w-1 h-1" iconClass="text-gray-500"></fjx-button>
            <!-- <fjx-svg-icon name="close" class="w-1.5 h-1.5" fillClass="text-gray-500"
              @click="show = false"></fjx-svg-icon> -->
          </div>
          <div class="content"></div>
          <div class="footer"></div>
        </div>
      </div>

    </Teleport>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const show = defineModel({ default: false, required: true, type: Boolean })

const props = defineProps({
  width: {
    type: String,
    default: '420px'
  }
})

</script>

<style lang='scss' scoped></style>
