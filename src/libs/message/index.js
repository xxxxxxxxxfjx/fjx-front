import { h, render, defineAsyncComponent } from 'vue'
// import MessageVue from './index.vue'

const MessageVue = defineAsyncComponent(() => import('./index.vue'))

export const message = (type, content, duration = 3000) => {
  // 动画结束时的回调
  const close = () => {
    // 卸载(vnode)
    render(null, document.body)
  }
  // 组件生成vnode
  const vnode = h(MessageVue, {
    type,
    content,
    duration,
    close
  })
  // 渲染(vnode, document.body)
  render(vnode, document.body)
}
