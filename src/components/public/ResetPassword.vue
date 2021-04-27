<template>
  <div class="home">
    <Navbar />
    <div class="col-5 mx-auto py-5 mt-5">
      <h1 class="text-center">Reset password</h1>
      <div class="card shadow">
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

          <div class="form-group">
            <label for="password">Password</label>
            <input
              type="password"
              class="form-control"
              id="password"
              placeholder="Password"
              required
              v-model="form.password"
            />
            <span class="text-danger" v-if="errors.password">
              {{ errors.password[0] }}
            </span>
          </div>

          <div class="form-group">
            <label for="password_confirmation">Confirm Password</label>
            <input
              type="password"
              class="form-control"
              id="password_confirmation"
              placeholder="Password Confirmation"
              required
              v-model="form.password_confirmation"
            />
            <span class="text-danger" v-if="errors.password_confirmation">
              {{ errors.password_confirmation[0] }}
            </span>
          </div>

          <button type="submit" @click.prevent="sendResetPassword" class="btn btn-info btn-block">
            Reset password
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import User from "../../apis/User";
import Csrf from "../../apis/Csrf";
import axios from "axios";
import Navbar from "../layout/Navigation.vue";
axios.defaults.withCredentials = true;
export default {
  data() {
    return {
      form: {
        email: "",
        password: "",
        password_confirmation: "",
        token: ''
      },
      rooms: [],
      errors: [],
    };
  },
  components: {
    Navbar,
  },
  methods: {
    sendResetPassword(){
      console.log(this.$route.query.token);
        this.form.token = this.$route.query.token;console.log(this.form);
      Csrf.getCookie().then(() => {
        }).then(()=>{
          User.sendResetPassword(this.form).then(()=>{
          this.$router.push({ name: "Login" });
        })
      })

    },
    register() {
      Csrf.getCookie().then(() => {
        User.register(this.form)
          .then(() => {
            this.$router.push({ name: "Login" });
          })
          .catch((error) => {
            if (error.response.status === 422) {
              this.errors = error.response.data.errors;
            }
          });
      });
    },
    getCurrentRoomExtension() {
      const currentRoom = this.rooms.find(
        (element) => element.id === this.form.room_id
      );
      if (currentRoom) return currentRoom.ext;
    },
    async changeImage(files) {
      try {
        const file = files[0];

        const data = new FormData();
        data.append("avatar", file);

        const response = await axios.post(
          "http://localhost:8000/api/upload",
          data
        );
        this.form.avatar = response.data.url;
      } catch (error) {
        this.errors = error.response.data.errors;
      }
    },
  },
};
</script>

<style scoped>
.home{
background-color: #605d86;
  font-family: "Poppins", sans-serif;
}

.home h1{
color: white;
}
</style>