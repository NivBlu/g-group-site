import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * Single-file build for preview hosting.
 *
 * The preview host serves one HTML document under a strict CSP that blocks
 * every external request, so nothing may be fetched at runtime: images are
 * inlined as data URIs by raising the inline limit past the largest asset,
 * and the JS/CSS are stitched into the HTML afterwards by scripts/bundle.mjs.
 */
export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    outDir: 'dist-artifact',
    emptyOutDir: true,
    cssCodeSplit: false,
    assetsInlineLimit: 100_000_000,
    target: 'es2020',
    modulePreload: { polyfill: false },
  },
})
