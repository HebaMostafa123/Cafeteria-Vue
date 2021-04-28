import axios from "axios";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "sweetalert2/dist/sweetalert2.min.css";
import { createApp } from "vue";
import VueSweetalert2 from "vue-sweetalert2";
import App from "./App.vue";
import router from "./router";

axios.defaults.withCredentials = true;
axios.defaults.headers["Authorization"] = `Bearer ${localStorage.getItem(
  "token"
)}`;

createApp(App)
  .use(router)
  .use(VueSweetalert2)
  .mount("#app");
