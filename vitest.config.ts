import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        // 👋 add the line below to add jsdom to vite
        environment: 'jsdom',
        globals: true,
        setupFiles: './tests/setup.js', // assuming the test folder is in the root of our project
    }
})