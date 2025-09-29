import { fileURLToPath, URL } from 'node:url'
import mkcert from 'vite-plugin-mkcert'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import glsl from 'vite-plugin-glsl';

// https://vite.dev/config/
export default defineConfig({
  server: { https: true },
  base: './',
  plugins: [
    mkcert(),
    vue(),
    vueDevTools(),
    glsl({
      include: ['**/*.glsl', '**/*.frag', '**/*.vert'],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})