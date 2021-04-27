import axios from "axios";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

axios.defaults.withCredentials = true;
axios.defaults.headers["Authorization"] = `Bearer ${localStorage.getItem(
    "token"
)}`;


createApp(App).use(router).use(VueSweetalert2).mount('#app')

// App
// App.mount('#app');
