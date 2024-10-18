//import { defineConfig } from 'vite'
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'
import eslint from 'vite-plugin-eslint2'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), eslint()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@assets': path.resolve(__dirname, './src/assets'),
            '@components': path.resolve(__dirname, './src/components'),
            '@hooks': path.resolve(__dirname, './src/hooks/'),
            '@pages': path.resolve(__dirname, './src/pages'),
            '@routes': path.resolve(__dirname, './src/routes'),
            '@services': path.resolve(__dirname, './src/services'),
            '@utils': path.resolve(__dirname, './src/utils'),
        },
    },
    test: {
        environment: 'jsdom',
        setupFiles: 'setupTests.ts',
        coverage: {
            include: ['src/**/*'],
            exclude: [
                'src/mocks',
                'src/vite-env.d.ts',
                'src/main.tsx',
                'src/**/*.test.ts',
            ],
        },
    },
})
