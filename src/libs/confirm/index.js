import { h, render } from 'vue'
import confirmVue from './index.vue'

export const confirm = (title, content, cancelText, confirmText) => {
  return new Promise((resolve, reject) => {
    if (title && !content) {
      content = title
      title = ''
    }

    // 取消前的回调
    const cancelHandler = () => {
      reject(new Error('取消删除'))
    }

    // 确认前的回调
    const confirmHandler = () => {
      resolve()
    }

    // 关闭弹窗前的回调
    const close = () => {
      render(null, document.body)
    }

    const vnode = h(confirmVue, {
      title,
      content,
      cancelText,
      confirmText,
      cancelHandler,
      confirmHandler,
      close
    })

    render(vnode, document.body)
  })
}
