import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import HelloWorld from "@/components/HelloWorld";
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import ProductsComponent from "@/components/products/ProductsComponent";
import EditProductComponent from "@/components/products/EditProductComponent";


const routes = [
    { path: "/", name: "/", component: HelloWorld },
    { path: "/products", name: "products", component: ProductsComponent },
    {path: "/product/:id", name: "editproduct",component: EditProductComponent,
    },
  ];

createApp(App).use(router).mount('#app');
app.use(VueAxios, axios);
app.use(router).mount("#app");
