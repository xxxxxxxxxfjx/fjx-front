import { createRouter, createWebHistory } from 'vue-router'
import { isMobileTerminal } from '@/utils/flexiable'
import pcTerminalRoutes from './modules/pc-Routes'
import mobileTerminalRoutes from './modules/mobile-Routes'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: isMobileTerminal.value ? mobileTerminalRoutes : pcTerminalRoutes
})

export default router
