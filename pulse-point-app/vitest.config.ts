/// <reference types="vitest" />
import { defineConfig } from 'vite'

export default defineConfig({
  test: {
    // ... Specify options here.
    environment:'jsdom',
    globals:true,
    setupFiles:'./src/tests/setup.js'
  },
})