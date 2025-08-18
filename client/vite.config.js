import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: './', // keep for GitHub Pages
  plugins: [react()],
  build: {
    sourcemap: false,           // do not generate .map files
    minify: 'terser',           // stronger minification
    terserOptions: {
      compress: { drop_console: true, drop_debugger: true },
      mangle: true,
      format: { comments: false }
    }
  }
})
