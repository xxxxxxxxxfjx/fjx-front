import 'virtual:svg-icons-register'
import './styles/index.scss'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useREM } from '@/utils/flexiable'
import libs from '@/libs'
import exec from '@/exec'
import setTheme from '@/utils/theme'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(libs)
app.use(exec)
app.mount('#app')
useREM()
setTheme()
