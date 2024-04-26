import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'

import vue from '@vitejs/plugin-vue'
import VueDevTools from 'vite-plugin-vue-devtools'
import Components from 'unplugin-vue-components/vite'
import pluginPurgeCss from '@mojojoejo/vite-plugin-purgecss'
import { PrimeVueResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 5175,
    strictPort: true
  },
  plugins: [
    vue(),
    VueDevTools(),
    pluginPurgeCss({
      variables: true,
    }),
    Components({
      resolvers: [PrimeVueResolver()],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
