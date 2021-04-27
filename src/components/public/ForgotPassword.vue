<template>
  <div class="home">
    <Navbar :user="user" />
    <div class="col-5 mx-auto py-5 mt-5">
      <h1 class="text-center">Forgot password</h1>
      <div class="card">
        <div class="card-body">
          <div class="form-group">
            <label for="email">Email address</label>
            <input
              type="email"
              v-model="form.email"
              class="form-control"
              id="email"
              required
            />
            <span class="text-danger" v-if="errors.email">
              {{ errors.email[0] }}
            </span>
          </div>
          <button @click.prevent="sendForgotPassword" class="btn btn-info btn-block">
            Send email
          </button>
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
      },
      errors: [],
      message: '',
      user: null,
    };
  },
  components: {
    Navbar,
  },
  methods: {
    sendForgotPassword(){
      console.log("here");
      Csrf.getCookie().then(() => {
        User.SendForgotPassword(this.form)
          .then((response) => {
            console.log(response.data);
            this.message = 'Email sent successfully'
          }).catch((errors) => {
            if (errors.response.status === 422) {
              this.errors = errors.response.data.errors;
              this.message = 'Failed to send email'
            }
          });  
      });
    },
    loginFacebook(){
      Csrf.getCookie().then(() => {
        User.loginUserFacebook().then((response)=>{
          if(response.data.url){
            window.location.href = response.data.url;
          }
        })
      })
    },
    loginFacebookCallback(){
      Csrf.getCookie().then(() => {
        User.loginUserFacebookCallback().then((response)=>{
          if(response.data.url){
            window.location.href = response.data.url;
          }
        })
      })
    }
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
