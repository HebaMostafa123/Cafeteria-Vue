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
        }).then((response)=>{
          User.login(this.form)
          .then((response) => {
            localStorage.setItem("token", response.data.jwt);
            User.auth().then((response) => {
              localStorage.setItem("auth", "true");
              this.user = response.data;
              if (response.data.is_admin) {
                localStorage.setItem("is_admin", "true");
                this.isAdmin = true;
              }
              this.$router.push({ name: "AdminHome" });
            });
          })
        })
      })
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
