import path from 'node:path';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

export default defineConfig(config => ({
  build: {
    rollupOptions: {
      input: {
        content: 'src/entrypoints/content.tsx',
        inject: 'src/entrypoints/inject.tsx',
      },
      output: {
        entryFileNames: '[name].js',
      },
    },
  },
  plugins: [
    react(),
  ],
  resolve: {
    alias: [{
      find: '$',
      replacement: path.resolve('src'),
    }],
  },
}));
