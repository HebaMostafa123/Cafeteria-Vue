import { createRouter, createWebHistory } from 'vue-router';
import Register from '../components/public/Register.vue';
import ProductsComponent from "@/components/products/ProductsComponent";
import EditProductComponent from "@/components/products/EditProductComponent";


const routes = [
  {
    path: '/register',
    component: Register
  },
  { path: "/products", name: "products", component: ProductsComponent },
    {path: "/product/:id", name: "editproduct",component: EditProductComponent,},
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/About.vue')
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
