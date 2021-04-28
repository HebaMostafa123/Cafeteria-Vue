<template>
  <div>
    <h1 v-if="path==='/authorize/facebook/callback'">Login with facebook, please wait!</h1>
    <h1 v-if="path==='/authorize/google/callback'">Login with google, please wait!</h1>
  </div>
</template>

<script>
import User from "../../apis/User";
import Csrf from "../../apis/Csrf";
export default {
  data(){
    return({
      path: ''
    })
  },
  methods: {
    loginProviderCallback(){
      this.path = this.$route.path;
      console.log('here',this.$route.path);
      Csrf.getCookie().then(() => {
        User.loginUserProviderCallback({
          code: this.$route.query.code
        }, this.$route.path).then((response) => {
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
        }
  },
  created(){
    this.loginProviderCallback();
  }
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
