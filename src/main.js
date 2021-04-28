import axios from 'axios';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
// import VueAxios from "vue-axios";
import ProductsComponent from "@/components/products/ProductsComponent";
import EditProductComponent from "@/components/products/EditProductComponent";
import axios from "axios";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

axios.defaults.withCredentials = true;
axios.defaults.headers["Authorization"] = `Bearer ${localStorage.getItem(
  "token"
)}`;



createApp(App).use(router).mount('#app');
