import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import path from 'path';

function resolve(dir: string) {
  return path.join(__dirname, dir);
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      /* options */
      resolvers: [AntDesignVueResolver()],
    }),
    vueJsx(),
  ],
  server: {
    proxy: {
      // 字符串简写方式
      '/api': 'http://localhost:8082/',
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve('src'),
    },
  },
});
