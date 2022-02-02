import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import vueJsx from '@vitejs/plugin-vue-jsx';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      /* options */
    }),
    vueJsx(),
  ],
  server: {
    proxy: {
      // 字符串简写方式
      '/v1/api/': 'http://localhost:8080/',
    },
  },
});
