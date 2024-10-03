import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vitrinePlugin from 'imarc-vitrine'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        vitrinePlugin({
            include: ['/resources/js/index.js']
        }),
    ],
})
