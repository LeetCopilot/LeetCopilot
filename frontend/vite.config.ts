import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: './dist',
    assetsDir: './assets',
    rollupOptions: {
        input: {
            background: './src/background.ts',
            content: './src/content.ts',
            index: 'index.html'
        },
        output: {
            // entryFileNames: '[name].js',
            entryFileNames(chunkInfo) {
                switch(chunkInfo.name) {
                    case 'index':
                        return 'assets/[name]-[hash:8].js';
                    default:
                        return '[name].js';
                }
                console.log(chunkInfo);
            },
            assetFileNames: 'assets/[name]-[hash:8].[ext]'
        }
    }
  }
})
