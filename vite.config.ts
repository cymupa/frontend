import { URL, fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

import pluginPurgeCss from '@mojojoejo/vite-plugin-purgecss'
import vue from '@vitejs/plugin-vue'
import { PrimeVueResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import VueDevTools from 'vite-plugin-vue-devtools'

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
      variables: true
    }),
    Components({
      resolvers: [PrimeVueResolver()]
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    rollupOptions: {
      // @see https://rollupjs.org/guide/en/#outputmanualchunks
      output: {
        manualChunks: {
          'group-news': [
            './src/views/home/HomeView.vue',
            './src/views/home/SingleNewsView.vue'
          ],
          'group-teams': [
            './src/views/team/TeamsView.vue',
            './src/views/team/TeamView.vue'
          ],
          'group-tournaments': [
            './src/views/tournament/TournamentsView.vue',
            './src/views/tournament/TournamentView.vue'
          ]
        }
      }
    }
  }
})
