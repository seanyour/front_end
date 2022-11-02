import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Unocss from 'unocss/vite'
import { presetUno, presetAttributify, presetIcons } from 'unocss'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { resolve } from 'path'

const pathResolve = (dir: string): string => {
  return resolve(__dirname, dir)
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      reactivityTransform: true,
    }),
    vueJsx(),
    Unocss({
      presets: [presetUno(), presetAttributify(), presetIcons()],
    }),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],

  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.jsx', '.vue'],
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      api: pathResolve('src/api'),
      assets: pathResolve('src/assets'),
      components: pathResolve('src/components'),
      layout: pathResolve('src/layout'),
      stores: pathResolve('src/stores'),
      utils: pathResolve('src/utils'),
      views: pathResolve('src/views'),
    },
  },

  server: {
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000/',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, ''),
      },
    },
  },
})
