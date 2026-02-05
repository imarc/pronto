import path from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vitrine from '@imarc/vitrine'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    manifest: true,
    rollupOptions: {
      input: [
        './resources/styles/index.scss',
        './resources/js/index.js',
        './public/main-icons-sprite.svg',
      ],
    },
  },
  plugins: [
    vue(),
    vitrine({
      name: `Pronto, a frontend framework built by Imarc`,
      version: `Pronto ${require('./package.json').version}`,
      logo: '<img src="/pronto.svg" alt="Pronto, a frontend framework built by Imarc">',
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
      '@': path.resolve(__dirname, 'resources/styles'),
      'vue': 'vue/dist/vue.esm-bundler.js'
    }
  }
})
