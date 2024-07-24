import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElment: (tag) => tag.includes('-')
        },
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
/*    lib: {
      entry: resolve(__dirname, 'src/main.js'),
      name: 'CredentialMaker',
      filename: 'ob3definer',
    },*/
    rollupOptions: {
      input: ['./index.html'],
      output: {
        dir: 'dist/',
        entryFileNames: 'ob3-definer.js',
        assetFileNames: 'ob3-definer.css',
        chunkFileNames: 'chunk.js',
        manualChunks: undefined,
      }
    }
  }
})
