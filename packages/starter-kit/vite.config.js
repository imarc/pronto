import { defineConfig } from 'vite'

const path = require('path')

export default defineConfig(async ({ command }) => {
    const config = {
        build: {
            manifest: true,
            outDir: 'web/dist',
            assetsDir: '.',
            rollupOptions: {
                input: 'assets/js/main.js',
            },
        },
        resolve: {
            alias: {
                '@assets': path.resolve(__dirname, 'assets'),
            },
        },
    }

    return config
})