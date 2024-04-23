import { defineAsyncComponent } from 'vue'
export default {
  install(app) {
    const components = import.meta.glob('./*/index.vue')
    // console.log(components)
    for (const [key, value] of Object.entries(components)) {
      let componentName = key.replace('./', '').split('/')[0]
      let prefix = 'e'
      app.component(`${prefix}-${componentName}`, defineAsyncComponent(value))
    }
  }
}
