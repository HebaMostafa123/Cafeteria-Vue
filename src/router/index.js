import { createRouter, createWebHistory } from 'vue-router';
import Unauthorized from '../components/error/Unauthorized.vue';
import Login from '../components/public/Login.vue';
import CreateOrder from '../components/public/newOrder/CreateOrder.vue';
import Register from '../components/public/Register.vue';
import Secure from '../components/Secure.vue';
import Trial from '../components/Trial.vue';
import User from '../components/User.vue';



const routes = [
  {
    path: '/register',
    name: "Register",
    component: Register,
    meta: {guestOnly: true}
  },
  {
    path: '/order',
    component: CreateOrder
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {guestOnly: true}
  },
  {
    path: '/',
    component: Secure,
    children:[
      {path:'', name:'AdminHome', component:User, meta:{authOnly: true}}
    ]
  },
  
  {
    path: '/unauthorized',
    name: 'Unauthorized',
    component: Unauthorized
  },
  {
    path: '/trial',
    name: 'Trial',
    component: Trial,
    meta: {adminOnly: true}
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

function isLoggedIn(){
  return localStorage.getItem('auth');
}

function isAdmin(){
  return localStorage.getItem('is_admin');
}

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.authOnly)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!isLoggedIn()) {
      next({
        path: "/login",
        query: { redirect: to.fullPath }
      });
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.adminOnly)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!isAdmin()) {
      next({
        path: "/unauthorized",
        query: { redirect: to.fullPath }
      });
    } else {
      next();
    }
  } 
  else if (to.matched.some(record => record.meta.guestOnly)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (isLoggedIn()) {
      next({
        path: "/about",
        query: { redirect: to.fullPath }
      });
    } else {
      next();
    }
  }else {
    next(); // make sure to always call next()!
  }
});

export default router
