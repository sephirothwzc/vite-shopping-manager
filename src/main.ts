import { createApp } from 'vue';
import App from './App.vue';
import router from './route/index';
import Antd from 'ant-design-vue';
import { createPinia } from 'pinia';
import 'ant-design-vue/dist/antd.css';

createApp(App).use(Antd).use(router).use(createPinia()).mount('#app');
