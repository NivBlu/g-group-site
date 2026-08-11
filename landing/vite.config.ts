import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// The built site is served from /downtown/ on a plain static host.
// A relative base keeps it portable — it works from any path, including
// GitHub Pages project sites and local file previews.
export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    outDir: '../downtown',
    emptyOutDir: true,
    assetsDir: 'assets',
    cssCodeSplit: false,
    target: 'es2020',
  },
})
