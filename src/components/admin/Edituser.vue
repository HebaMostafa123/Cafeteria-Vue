<template>
  <div class="home">
    <Navbar />
    <div class="col-5 mx-auto py-5 mt-5">
      <h1 class="text-center" style="color: white">Update User</h1>
      <div class="card shadow">
        <div class="card-body">
          <div class="form-group">
            <label for="name">Name</label>
            <input
              type="text"
              class="form-control"
              id="name"
              placeholder="Name"
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
            <label for="room_id">Room number</label>
            <select id="room_id" class="form-control" v-model="form.room_id">
              <option v-for="room in rooms" :value="room.id" :key="room.id">
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
                />
              </div>
              <div class="col-3">
                <label
                  class="btn"
                  style="background-color: #e0a800; border-color: #d39e00"
                >
                  Upload
                  <input
                    type="file"
                    hidden
                    @change="changeImage($event.target.files)"
                  />
                </label>
              </div>
            </div>
            <span class="text-danger" v-if="errors.avatar">
              {{ errors.avatar[0] }}
            </span>
          </div>

          <button
            type="submit"
            @click.prevent="Edituser"
            class="btn btn-primary btn-block"
            style="background-color: #17a2b8; border-color: #17a2b8"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Admin from "../../apis/Admin";
import Uplode from "../../apis/Image";
import Csrf from "../../apis/Csrf";

import axios from "axios";
export default {
  data() {
    return {
      form: {
        name: this.$route.params.name,
        email: this.$route.params.email,

        // password_confirmation: "",
        room_id: this.$route.room_id,
        avatar: this.$route.params.avatar,
      },
      rooms: [],
      errors: [],
      success: "",
      baseURL: "http://localhost:8000/api/",
    };
  },
  mounted() {
    Admin.getRooms().then((response) => {
      this.rooms = response.data;
    });
  },
  methods: {
    Edituser() {
      const formData = new FormData();
      formData.append("name", this.form.name);
      formData.append("email", this.form.email);
      formData.append("password", this.form.password);
      formData.append("room_id", this.form.room_id);
      formData.append("avatar", this.form.avatar);
      formData.append("_method", "PATCH");

      // Admin.edituser(`${this.$route.params.id}`, formData)

      axios
        .post(this.baseURL + `pages/${this.$route.params.id}`, formData)
        .then((res) => {
          this.$router.push({
            name: "Showuser",
          });
        })
        .catch((e) => {
          if (e.response.status === 422) {
            this.errors = e.response.data.errors;
          }
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
.card {
  border: 1px solid #605d86;
}
h1 {
  margin-bottom: 5%;
}
.home {
  margin: 0%;
  padding: 0%;
}

label {
  color:#495057;
}

</style>
