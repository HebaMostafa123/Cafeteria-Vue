<template>
  <nav class="navbar navbar-expand-lg ">
      <router-link class="navbar-brand nav-link" to="/">    <img src="~@/assets/logo.png" width="30" height="30" class="d-inline-block align-top" alt="">
Cafeteria</router-link>
      
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <!--Start of admin navbar-->
      <li class="nav-item">
        <router-link class="nav-link" v-if="user && user.is_admin" to="/">Home</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" v-if="user && user.is_admin" to="/products">Products</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" v-if="user && user.is_admin" to="/Showuser">Users</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" v-if="user && user.is_admin" to="/order">New Order</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" v-if="user && user.is_admin" to="/checks">Checks</router-link>
      </li>
       <li class="nav-item">
        <router-link class="nav-link" v-if="user && user.is_admin" to="/adminorders">Orders</router-link>
      </li>
      <!--End of admin navbar-->
      <!--Start of Normal User navbar-->
      <li class="nav-item">
        <router-link class="nav-link" v-if="user && !user.is_admin" to="/">Home</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" v-if="user && !user.is_admin" to="/orders">Orders</router-link>
      </li>
      <!--End of Normal User navbar-->
    </ul>
    <ul class="nav navbar-nav"> 
      <li v-if="user" class="nav-item">
          <img :src="user.avatar" class="avatar"/>
      </li>
      <li v-if="user" class="nav-item nav-link mt-2">
          {{user.name}}
      </li>
      <router-link v-if="!user" class="nav-item nav-link" :to="{ name: 'Login' }">
          Login
        </router-link>
        <router-link
          v-if="!user"
          class="nav-item nav-link"
          :to="{ name: 'Register' }"
        >
          Register
        </router-link>
        <a class="nav-item nav-link m-2" v-if="user" @click.prevent="logout"
          >Logout</a
        >
      </ul>
    </div>
  </nav>
</template>

<script>
import User from "../../apis/User";
import Csrf from "../../apis/Csrf";
export default {
  props: ["user"],
  mounted() {
    var emitter = require("tiny-emitter/instance");
    emitter.on("login", () => {
      User.auth().then((response) => {
        this.isLoggedIn = true;
        this.user = response.data;
        if (response.data.is_admin) {
          this.isAdmin = true;
        }
      });
    });
    this.isLoggedIn = !!localStorage.getItem("auth");
  },
  methods: {
    logout() {
      Csrf.getCookie().then(() => {
        User.logout().then(() => {
          localStorage.removeItem("token");
          localStorage.removeItem("is_admin");
          localStorage.removeItem("auth");
          this.$router.push({ name: "Login" });
        });
      });
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@200&display=swap");

nav {
  font-family: "Poppins", sans-serif;
  color: white;
  background-color: #605d86;
}

nav a {
  color: white;
}
nav a:hover {
  color: #E03583;
}

.avatar {
  width: 2.5rem;
  height: 2.5rem;
  margin-top:0.3rem;
  border-radius: 50px;
}
</style>