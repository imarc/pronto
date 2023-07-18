import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig(async ({ command }) => {
    const config = {
        build: {
            manifest: true,
            outDir: 'web/dist',
            assetsDir: '.',
            rollupOptions: {
                input: [
                    'assets/js/main.js',
                ],
            },
        },
        resolve: {
            alias: {
                '@styles': path.resolve(__dirname, 'assets/styles'),
                '@js': path.resolve(__dirname, 'assets/js'),
                '@svgs': path.resolve(__dirname, 'assets/svgs'),
            },
        },
    }

    return config
})
