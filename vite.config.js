import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // 确保别名映射到 src 目录
    },
  },
  // define: {
  //   'process.env': {} // 用空对象模拟 process.env，防止错误
  // },
})
