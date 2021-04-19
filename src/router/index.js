import { createRouter, createWebHistory } from 'vue-router';
import CreateOrder from '../components/public/CreateOrder.vue';
import Register from '../components/public/Register.vue';


const routes = [
  {
    path: '/register',
    component: Register
  },
  {
    path: '/order',
    component: CreateOrder
  },
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
