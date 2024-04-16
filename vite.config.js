import path from 'path'
import { fileURLToPath, URL } from 'node:url'
import Tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueDevTools from 'vite-plugin-vue-devtools'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VueDevTools(),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), './src/assets/icons')],
      symbolId: 'icon-[name]'
    })
  ],
  server: {
    proxy: {
      '/api': {
        // 代理请求之后的请求地址
        target: 'https://api.imooc-front.lgdsunday.club/',
        // 跨域
        changeOrigin: true
        // rewrite: (path) => path.replace(/^\/v1/, '')
      }
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    postcss: {
      plugins: [Tailwindcss, autoprefixer]
    }
  }
})
