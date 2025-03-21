import { createApp } from 'vue'
import { createPinia } from 'pinia';
import router from './router';
import ArcoVue from '@arco-design/web-vue';
import ArcoVueIcon from '@arco-design/web-vue/es/icon';
import '@arco-design/web-vue/dist/arco.css';
import App from './App.vue'
import { Boot } from '@wangeditor/editor'
import formulaModule from '@wangeditor/plugin-formula'

// 注册。要在创建编辑器之前注册，且只能注册一次，不可重复注册。
Boot.registerModule(formulaModule)
const app = createApp(App);
const pinia = createPinia();
app.use(pinia);
app.use(router);
app.use(ArcoVue);
app.use(ArcoVueIcon);
app.mount('#app');
// console.log(import.meta.env.VITE_BASE_API_URL)