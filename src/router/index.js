import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/public/Login.vue';
import Register from '../components/public/Register.vue';
import User from '../components/User.vue';

const routes = [
  {
    path:'/admin',
    
  },
  {
    path: '/register',
    name: "Register",
    component: Register,
    meta: {guestOnly: true}
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {guestOnly: true}
  },
  
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: function () {
    //   return import(/* webpackChunkName: "about" */ '../views/About.vue')
    // }
    component: User,
  }
]

// function isLoggedIn(){
//   return localStorage.getItem('auth');
// }

// function isAdmin(){
//   return localStorage.getItem('is_admin');
// }

// router.beforeEach((to, from, next) => {
//   if (to.matched.some(record => record.meta.authOnly)) {
//     // this route requires auth, check if logged in
//     // if not, redirect to login page.
//     if (!isLoggedIn()) {
//       next({
//         path: "/login",
//         query: { redirect: to.fullPath }
//       });
//     } else {
//       next();
//     }
//   } else if (to.matched.some(record => record.meta.guestOnly)) {
//     // this route requires auth, check if logged in
//     // if not, redirect to login page.
//     if (isLoggedIn()) {
//       next({
//         path: "/dashboard",
//         query: { redirect: to.fullPath }
//       });
//     } else {
//       next();
//     }
//   } else {
//     next(); // make sure to always call next()!
//   }
// });

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
