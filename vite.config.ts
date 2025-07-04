import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true
  },
  base: '/MS-Docs/', // Update this to match your actual GitHub repository name
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false
  }
})
