<template>
  <div class="home">
    <Navbar />
    <div class="col-5 mx-auto py-5 mt-5">
      <h1 class="text-center">Please Register</h1>
      <div class="card shadow">
        <div class="card-body">
          <div class="form-group">
            <label for="name">Name</label>
            <input
              type="text"
              class="form-control"
              id="name"
              placeholder="Name"
              required
              v-model="form.name"
            />
            <span class="text-danger" v-if="errors.name">
              {{ errors.name[0] }}
            </span>
          </div>

          <div class="form-group">
            <label for="email">Email address</label>
            <input
              type="email"
              class="form-control"
              id="email"
              placeholder="Email address"
              required
              v-model="form.email"
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

          <div class="form-group">
            <label for="room_id">Room number</label>
            <select id="room_id" class="form-control" v-model="form.room_id">
              <option value="" disabled selected hidden>Select a room</option>
              <option v-for="room in rooms" :value="room.id">
                {{ room.number }}
              </option>
            </select>
            <span class="text-danger" v-if="errors.room_id">
              {{ errors.room_id[0] }}
            </span>
          </div>

          <div class="form-group">
            <label for="ext">Extension</label>
            <input
              type="text"
              class="form-control"
              name="ext"
              :value="getCurrentRoomExtension()"
              placeholder="room extension"
              readonly
            />
          </div>

          <div class="form-group">
            <label for="avatar">Avatar</label>
            <div class="row">
              <div class="col-9">
                <input
                  type="text"
                  class="form-control"
                  name="Avatar"
                  readonly
                  v-model="form.avatar"
                  placeholder="avatar"

                />
              </div>
              <div class="col-3">
                <label class="btn btn-warning">
                  Upload <input type="file" accept="image/*" hidden @change="changeImage($event.target.files)"/>
                </label>
              </div>
            </div>
            <span class="text-danger" v-if="errors.avatar">
              {{ errors.avatar[0] }}
            </span>
          </div>

          <button type="submit" @click.prevent="register" class="btn btn-info btn-block">
            Register
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
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        room_id: "",
        avatar: "",
      },
      rooms: [],
      errors: [],
    };
  },
  components: {
    Navbar,
  },
  mounted() {
    User.getRooms().then((response) => {
      this.rooms = response.data;
    });
  },
  methods: {
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

label{
  color:#495057;
}
</style>