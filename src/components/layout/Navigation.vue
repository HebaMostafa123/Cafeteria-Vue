<template>
   <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <a class="navbar-brand" href="#">Cafeteria</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <!--Start of admin navbar-->
      <li class="nav-item">
        <router-link class="nav-link" v-if="user && user.is_admin" to="/">Home</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" v-if="user && user.is_admin" to="/">Products</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" v-if="user && user.is_admin" to="/">Users</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" v-if="user && user.is_admin" to="/">Manual Orders</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" v-if="user && user.is_admin" to="/">Checks</router-link>
      </li>
       <li class="nav-item">
        <router-link class="nav-link" v-if="user && user.is_admin" to="/orders">Orders</router-link>
      </li>
      <!--End of admin navbar-->
      <!--Start of Normal User navbar-->
      <li class="nav-item">
        <router-link class="nav-link" v-if="user && !user.is_admin" to="/">Home</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" v-if="user && !user.is_admin" to="/">My Orders</router-link>
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
        <router-link v-if="!user" class="nav-item nav-link" :to="{ name: 'Register' }">
          Register
        </router-link>
        <a class="nav-item nav-link m-2" v-if="user" @click.prevent="logout"
          >Logout</a>
      </ul>
  </div>
</nav>
</template>

<script>
import User from '../../apis/User';
import Csrf from '../../apis/Csrf';
export default {
  props:['user'],
  mounted(){
    var emitter = require('tiny-emitter/instance');
    emitter.on('login', ()=>{
      User.auth().then((response)=>{
      this.isLoggedIn = true;
      this.user = response.data;
      if(response.data.is_admin){
        this.isAdmin = true;
      }
    })
    });
    this.isLoggedIn = !!localStorage.getItem('auth');
  },
  methods:{
    logout(){
      Csrf.getCookie().then(()=>{
        User.logout().then(()=>{
          localStorage.removeItem("token");
          localStorage.removeItem("is_admin");
          localStorage.removeItem("auth");
          this.$router.push({name: "Login"})
        })
      })
    }
  }

}
</script>

<style scoped>
.avatar{
  width: 60px;
  height: 60px;
  border-radius: 50px;
}
</style>