<template>
  <div id="app" class="bg-light h-screen">
    <Navbar :user="user" />
    <router-view />
  </div>
</template>

<script>
import Navbar from "./layout/Navigation.vue";
import User from "../apis/User";
export default {
  data() {
    return {
      user: null,
    };
  },
  components: {
    Navbar,
  },
  mounted(){
    User.auth().then((response)=>{
      this.user = response.data;
    });
  },
  destroyed() {
    alert("hey");
    localStorage.removeItem("auth");
    localStorage.removeItem("is_admin");
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
