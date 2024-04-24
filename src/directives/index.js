export default {
  install(app) {
    const modules = import.meta.glob('./*/*.js', { eager: true })
    for (const [key, value] of Object.entries(modules)) {
      let directiveKey = key.replace('./', '').split('/')[1].split('.')[0]
      app.directive(directiveKey, value)
    }
  }
}
