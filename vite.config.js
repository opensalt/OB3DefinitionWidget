import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'path';

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
  // build: {
  //   lib: {
  //     entry: resolve(__dirname, 'src/main.js'),
  //     name: 'CredentialMaker',
  //     filename: 'credential-maker',
  //   },
  //   rollupOptions: {
  //   }
  // }
})
