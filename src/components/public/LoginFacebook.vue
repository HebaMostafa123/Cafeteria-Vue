<template>
  <div>
    <h1>Login with facebook, please wait!</h1>
  </div>
</template>

<script>
import User from "../../apis/User";
import Csrf from "../../apis/Csrf";
export default {
  methods: {
    loginFacebookCallback(){
      Csrf.getCookie().then(() => {
        User.loginUserFacebookCallback({
          code: this.$route.query.code
        }).then((response) => {
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
    this.loginFacebookCallback();
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
