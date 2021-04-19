import 'bootstrap';
import BootstrapVue from "bootstrap-vue";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "bootstrap/dist/css/bootstrap.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Vue, { createApp } from "vue";
import App from './App.vue';
import router from './router';

Vue.use(BootstrapVue);
Vue.config.productionTip = false;

createApp(App).use(router).mount('#app')
