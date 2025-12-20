import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// https://vite.dev/config/
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import TurboConsole from 'unplugin-turbo-console/vite'
import { compression } from 'vite-plugin-compression2'

const host = process.env.TAURI_DEV_HOST

export default defineConfig(async () => ({
  plugins: [
    react(),
    tailwindcss(),
    TurboConsole({
      /* options here */
    }),
    compression(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
  //
  // 1. prevent Vite from obscuring rust errors
  clearScreen: false,
  // 2. tauri expects a fixed port, fail if that port is not available
  server: {
    port: 1420,
    strictPort: true,
    host: host || false,
    hmr: host
      ? {
          protocol: 'ws',
          host,
          port: 1421,
        }
      : undefined,
    watch: {
      // 3. tell Vite to ignore watching `src-tauri`
      ignored: ['**/src-tauri/**'],
    },
  },
  build: {
    sourcemap: true,
  },
}))
