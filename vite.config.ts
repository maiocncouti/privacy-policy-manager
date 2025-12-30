import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // A propriedade 'base' é essencial para o GitHub Pages.
  // './' garante que os arquivos js e css sejam buscados na pasta atual
  // e não na raiz do domínio.
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false
  }
});