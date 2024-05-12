import { defineAsyncComponent } from 'vue'
import { COMPONENT_PREFIX } from '@/constants'
export { confirm } from './confirm'
export { message } from './message'

export default {
  install(app) {
    const components = import.meta.glob('./*/index.vue')
    // console.log(components)
    for (const [key, value] of Object.entries(components)) {
      // console.log(key, value)
      const name = key.replace('./', '').split('/')[0]
      app.component(`${COMPONENT_PREFIX}-${name}`, defineAsyncComponent(value))
    }
  }
}
