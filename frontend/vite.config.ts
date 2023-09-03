import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  if (mode === 'content') {
    return {
      build: {
        emptyOutDir: false,
        outDir: './dist',
        rollupOptions: {
          input: {
            content: './src/content.tsx',
          },
          output: {
            inlineDynamicImports: true,
            entryFileNames: '[name].js',
          },
        },
      },
    };
  }

  return {
    plugins: [react()],
    build: {
      outDir: './dist',
      assetsDir: './assets',
      rollupOptions: {
        input: {
          background: './src/background.ts',
          index: 'index.html',
        },
        output: {
          entryFileNames(chunkInfo) {
            switch (chunkInfo.name) {
              case 'index':
                return 'assets/[name]-[hash:8].js';
              default:
                return '[name].js';
            }
          },
          assetFileNames: 'assets/[name]-[hash:8].[ext]',
        },
      },
    },
  };
});
