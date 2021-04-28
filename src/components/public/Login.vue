<template>
  <div class="home">
    <Navbar :user="user" />
    <div class="col-5 mx-auto py-5 ">
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
            <span class="text-danger" style="color:orange" v-if="errors.email">
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
            <span class="text-danger" style="color:orange" v-if="errors.password">
              {{ errors.password[0] }}
            </span>
          </div>

          <div class="login-box">
            <button
              class="social-button"
              id="login-connect"
              @click.prevent="login"
            >
              <span>Login</span>
            </button>
            <button
              class="social-button"
              id="facebook-connect"
              @click.prevent="loginProvider('facebook')"
            >
              <span>Connect with Facebook</span>
            </button>
            <button
              class="social-button"
              id="google-connect"
              @click.prevent="loginProvider('google')"
            >
              <span>Connect with Google</span>
            </button>

            <router-link to="/forgot-password">Forgot password?</router-link>
          </div>
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
            if (response.data.access_token) {
              localStorage.setItem("token", response.data.access_token);
            } else {
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
    loginProvider(provider) {
      Csrf.getCookie().then(() => {
        User.loginUserProvider(provider).then((response) => {
          if (response.data.url) {
            window.location.href = response.data.url;
          }
        });
      });
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@200&display=swap");

.home {
  background-color: #605d86;
  font-family: "Poppins", sans-serif;
  height: 50rem;
  width: 80rem;
  background-image:url("~@/assets/login.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.home h1 {
  color: white;
}

label {
  color:#495057;
}
.login-box {
  background: #fff;
  padding: 20px;
  max-width: 480px;
  text-align: center;
  letter-spacing: 1px;
  position: relative;
}

.login-box:hover {
  box-shadow: 0 8px 17px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.login-box h2 {
  margin: 20px 0 20px;
  padding: 0;
  text-transform: uppercase;
  color: #4688f1;
}

.social-button {
  background-position: 25px 0px;
  box-sizing: border-box;
  color: rgb(255, 255, 255);
  cursor: pointer;
  display: inline-block;
  height: 50px;
  line-height: 50px;
  text-align: left;
  text-decoration: none;
  text-transform: uppercase;
  vertical-align: middle;
  width: 100%;
  border-radius: 3px;
  margin: 10px auto;
  outline: rgb(255, 255, 255) none 0px;
  padding-left: 20%;
  transition: all 0.2s cubic-bezier(0.72, 0.01, 0.56, 1) 0s;
  -webkit-transition: all 0.3s ease;
  -moz-transition: all 0.3s ease;
  -ms-transition: all 0.3s ease;
  -o-transition: all 0.3s ease;
  transition: all 0.3s ease;
}

#login-connect {
  background: rgb(255, 255, 255) url("~@/assets/logo.png") no-repeat scroll 7px
    7px / 30px 30px padding-box border-box;
  border: 1px solid rgb(213, 56, 116);
}

#login-connect:hover {
  border-color: #d53874;
  background: rgb(200, 80, 97) url("~@/assets/logon.png") no-repeat scroll 7px
    7px / 30px 30px padding-box border-box;
  -webkit-transition: all 0.8s ease-out;
  -moz-transition: all 0.3s ease;
  -ms-transition: all 0.3s ease;
  -o-transition: all 0.3s ease;
  transition: all 0.3s ease-out;
}

#login-connect span {
  box-sizing: border-box;
  color: rgb(200, 80, 97);
  cursor: pointer;
  text-align: center;
  text-transform: uppercase;
  border: 0px none rgb(255, 255, 255);
  outline: rgb(255, 255, 255) none 0px;
  -webkit-transition: all 0.3s ease;
  -moz-transition: all 0.3s ease;
  -ms-transition: all 0.3s ease;
  -o-transition: all 0.3s ease;
  transition: all 0.3s ease;
}

#login-connect:hover span {
  color: #fff;
  -webkit-transition: all 0.3s ease;
  -moz-transition: all 0.3s ease;
  -ms-transition: all 0.3s ease;
  -o-transition: all 0.3s ease;
  transition: all 0.3s ease;
}

#facebook-connect {
  background: rgb(255, 255, 255)
    url("https://raw.githubusercontent.com/eswarasai/social-login/master/img/facebook.svg?sanitize=true")
    no-repeat scroll 5px 0px / 30px 50px padding-box border-box;
  border: 1px solid rgb(60, 90, 154);
}

#facebook-connect:hover {
  border-color: rgb(60, 90, 154);
  background: rgb(60, 90, 154)
    url("https://raw.githubusercontent.com/eswarasai/social-login/master/img/facebook-white.svg?sanitize=true")
    no-repeat scroll 5px 0px / 30px 50px padding-box border-box;
  -webkit-transition: all 0.8s ease-out;
  -moz-transition: all 0.3s ease;
  -ms-transition: all 0.3s ease;
  -o-transition: all 0.3s ease;
  transition: all 0.3s ease-out;
}

#facebook-connect span {
  box-sizing: border-box;
  color: rgb(60, 90, 154);
  cursor: pointer;
  text-align: center;
  text-transform: uppercase;
  border: 0px none rgb(255, 255, 255);
  outline: rgb(255, 255, 255) none 0px;
  -webkit-transition: all 0.3s ease;
  -moz-transition: all 0.3s ease;
  -ms-transition: all 0.3s ease;
  -o-transition: all 0.3s ease;
  transition: all 0.3s ease;
}

#facebook-connect:hover span {
  color: #fff;
  -webkit-transition: all 0.3s ease;
  -moz-transition: all 0.3s ease;
  -ms-transition: all 0.3s ease;
  -o-transition: all 0.3s ease;
  transition: all 0.3s ease;
}

#google-connect {
  background: rgb(255, 255, 255)
    url("https://raw.githubusercontent.com/eswarasai/social-login/master/img/google-plus.png")
    no-repeat scroll 5px 0px / 50px 50px padding-box border-box;
  border: 1px solid rgb(220, 74, 61);
}

#google-connect:hover {
  border-color: rgb(220, 74, 61);
  background: rgb(220, 74, 61)
    url("https://raw.githubusercontent.com/eswarasai/social-login/master/img/google-plus-white.png")
    no-repeat scroll 5px 0px / 50px 50px padding-box border-box;
  -webkit-transition: all 0.8s ease-out;
  -moz-transition: all 0.3s ease;
  -ms-transition: all 0.3s ease;
  -o-transition: all 0.3s ease;
  transition: all 0.3s ease-out;
}

#google-connect span {
  box-sizing: border-box;
  color: rgb(220, 74, 61);
  cursor: pointer;
  text-align: center;
  text-transform: uppercase;
  border: 0px none rgb(220, 74, 61);
  outline: rgb(255, 255, 255) none 0px;
  -webkit-transition: all 0.3s ease;
  -moz-transition: all 0.3s ease;
  -ms-transition: all 0.3s ease;
  -o-transition: all 0.3s ease;
  transition: all 0.3s ease;
}

#google-connect:hover span {
  color: #fff;
  -webkit-transition: all 0.3s ease;
  -moz-transition: all 0.3s ease;
  -ms-transition: all 0.3s ease;
  -o-transition: all 0.3s ease;
  transition: all 0.3s ease;
}
</style>
