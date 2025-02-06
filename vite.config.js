import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vitrine from '@imarc/vitrine'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        vitrine({
            basePaths: [
              'resources',
            ],
            includes: [
              '/resources/styles/index.scss',
              '/resources/js/index.js',
            ],
        }),
    ],
    resolve: {
        alias: {
            'vue': 'vue/dist/vue.esm-bundler.js'
        }
    }
})
