import 'virtual:svg-icons-register'
import './styles/index.scss'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useREM } from '@/utils/flexiable'
import libs from '@/libs'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(libs)

app.mount('#app')
useREM()
