//import { defineConfig } from 'vite'
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@assets': path.resolve(__dirname, './src/assets'),
        },
    },
    test: {
        environment: 'jsdom',
        setupFiles: 'setupTests.ts',
        coverage: {
            include: ['src/**/*'],
            exclude: ['src/mocks', 'src/vite-env.d.ts'],
        },
    },
})
