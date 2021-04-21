import { createRouter, createWebHistory } from 'vue-router';
import Register from '../components/public/Register.vue';
import Adduser from '../components/admin/Adduser.vue';
import Showuser from '../components/admin/Showuser.vue';
import Edituser from '../components/admin/Edituser.vue';


const routes = [
  {
    path: '/register',
    component: Register
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
  },
  {
    path: '/Adduser',
    name: 'Adduser',
    component: Adduser
  },
  {
    path: '/Showuser',
    name: 'Showuser',
    component: Showuser
  },

  {
    path: '/Edituser/:id',
    name: 'Edituser',
    component: Edituser
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
