import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    cssCodeSplit: true,
    minify: 'terser',
    target: 'es2018',
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
  css: {
    devSourcemap: true,
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'gsap', 'lucide-react'],
  },
});
