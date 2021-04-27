<template>
  <div class="home">
    <Navbar :user="user" />
    <div class="col-5 mx-auto py-5 mt-5">
      <h1 class="text-center">Login</h1>
      <div class="card">
        <div class="card-body">
          <div class="form-group">
            <label for="email">Email address</label>
            <input
              type="email"
              v-model="form.email"
              class="form-control"
              id="email"
            />
            <span class="text-danger" v-if="errors.email">
              {{ errors.email[0] }}
            </span>
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input
              type="password"
              v-model="form.password"
              class="form-control"
              id="password"
            />
            <span class="text-danger" v-if="errors.password">
              {{ errors.password[0] }}
            </span>
          </div>
          <b-button @click.prevent="loginProvider('facebook')" class="btn btn-info btn-block">
            Login with facebook
          </b-button>
          <b-button @click.prevent="loginProvider('google')" class="btn btn-info btn-block">
            Login with google
          </b-button>
          <button @click.prevent="login" class="btn btn-info btn-block">
            Login
          </button>
          <router-link to="/forgot-password">Forgot password?</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import User from "../../apis/User";
import Csrf from "../../apis/Csrf";
import Navbar from "../layout/Navigation.vue";
export default {
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      errors: [],
      user: null,
    };
  },
  components: {
    Navbar,
  },
  methods: {
    login() {
      Csrf.getCookie().then(() => {
        User.login(this.form)
          .then((response) => {
            if(response.data.access_token){
              localStorage.setItem("token", response.data.access_token);
            }else{
              reject(response);
            }
          Csrf.getCookie().then(() => {
            User.auth().then((response) => {
              localStorage.setItem("auth", "true");
              this.user = response.data;
              if (response.data.is_admin) {
                localStorage.setItem("is_admin", "true");
                this.isAdmin = true;
              }
              this.$router.push({ name: "AdminHome" });
            });
          });
            
          })
          .catch((errors) => {
            if (errors.response.status === 422) {
              this.errors = errors.response.data.errors;
            }
          });
      });
    },
    loginProvider(provider){
      Csrf.getCookie().then(() => {
        User.loginUserProvider(provider).then((response)=>{
          if(response.data.url){
            window.location.href = response.data.url;
          }
        })
      })
    },
    
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@200&display=swap");

.home {
  background-color: #605d86;
  font-family: "Poppins", sans-serif;
  height:600px;
}

.home h1 {
  color: white;
}
</style>
