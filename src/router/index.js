import { createRouter, createWebHistory } from "vue-router";
import Adduser from "../components/admin/Adduser.vue";
import Edituser from "../components/admin/Edituser.vue";
import Showuser from "../components/admin/Showuser.vue";
import Check from "../components/check/Check.vue";
import Unauthorized from "../components/error/Unauthorized.vue";
import NotFound from "../components/public/404.vue";
import Orders from "../components/public/listOrder/proccessedOrders.vue";
import Login from "../components/public/Login.vue";
import CreateOrder from "../components/public/newOrder/CreateOrder.vue";
import Register from "../components/public/Register.vue";
import Secure from "../components/Secure.vue";
import Trial from "../components/Trial.vue";
import User from "../components/User.vue";

const routes = [
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: { guestOnly: true },
  },

  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { guestOnly: true },
  },
  {
    path: "/",
    component: Secure,
    children: [
      {
        path: "/orders",
        name: "Orders",
        component: Orders,
        meta: { adminOnly: true },
      },
      {
        path: "",
        name: "AdminHome",
        component: User,
        meta: { authOnly: true },
      },
      {
        path: "/order",
        name: "CreateOrder",
        component: CreateOrder,
        meta: { authOnly: true },
      },
      {
        path: "",
        name: "AdminHome",
        component: User,
        meta: { authOnly: true },
      },
      {
        path: "/checks",
        name: "AdminChecks",
        component: Check,
        meta: { authOnly: true },
      },
      {
        path: "/order",
        name: "CreateOrder",
        component: CreateOrder,
        meta: { authOnly: true },
      },
      {
        path: "/Showuser",
        name: "Showuser",
        component: Showuser,
        meta: { adminOnly: true },
      },
      {
        path: "/Edituser/:id",
        name: "Edituser",
        component: Edituser,
        meta: { adminOnly: true },
      },
      {
        path: "/Adduser",
        name: "Adduser",
        component: Adduser,
        meta: { adminOnly: true },
      },
    ],
  },

  {
    path: "/unauthorized",
    name: "Unauthorized",
    component: Unauthorized,
  },
  {
    path: "/trial",
    name: "Trial",
    component: Trial,
    meta: { adminOnly: true },
  },
  {
    path: "/notfound",
    name: "NotFound",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

function isLoggedIn() {
  return localStorage.getItem("auth");
}

function isAdmin() {
  return localStorage.getItem("is_admin");
}

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.authOnly)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!isLoggedIn()) {
      next({
        path: "/login",
        query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  } else if (to.matched.some((record) => record.meta.adminOnly)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!isAdmin()) {
      next({
        path: "/unauthorized",
        query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  } else if (to.matched.some((record) => record.meta.guestOnly)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (isLoggedIn()) {
      next({
        path: "/about",
        query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  } else {
    next(); // make sure to always call next()!
  }
});

export default router;
