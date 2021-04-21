<template>
  <form class="needs-validation" @submit.prevent="adduser" novalidate>
    <div class="form">
      <div class="col-md-4 mb-3">
        <label for="validationCustom01">Name</label>
        <input
          type="text"
          class="form-control"
          id="validationCustom01"
          required
          v-model="form.name"
        />
        <div class="valid-feedback">Looks good!</div>
      </div>

      <div class="col-md-4 mb-3">
        <label for="validationCustomUsername"> Email</label>
        <div class="input-group">
          <div class="input-group-prepend">
            <span class="input-group-text" id="inputGroupPrepend">@</span>
          </div>
          <input
            type="email"
            class="form-control"
            id="validationCustomUsername"
            aria-describedby="inputGroupPrepend"
            required
            v-model="form.email"
          />
          <div class="invalid-feedback">Please choose a emanil.</div>
        </div>
      </div>
      <div class="col-md-4 mb-3">
        <label for="validationCustom02">Password</label>
        <input
          type="password"
          class="form-control"
          id="validationCustom02"
          required
          v-model="form.password"
        />
        <div class="valid-feedback">Looks good!</div>
      </div>

      <div class="col-md-6 mb-3">
        <label for="validationCustom03">Password Confirmation</label>
        <input
          type="Password"
          class="form-control"
          id="validationCustom03"
          required
        />
        <div class="invalid-feedback">
          Please provide a valid Password Confirmation.
        </div>
      </div>
      <div class="col-md-3 mb-3">
        <label for="room_id">Room number</label>
        <select id="room_id" class="form-control" v-model="form.room_id">
          <option selected>Choose your room number</option>
          <option v-for="room in rooms" :key="room.id" :value="room.id">
            {{ room.number }}
          </option>
        </select>

        <div class="invalid-feedback">Please select a validRoom number.</div>
      </div>
      <div class="form-group">
        <label for="avatar">Avatar</label>
        <div class="input-group-append">
          <input
            type="text"
            class="form-control-file"
            name="Avatar"
            v-model="form.avatar"
          />
        </div>
        <label class="btn btn-primary">
          Upload
          <input
            type="file"
            hidden
            @change="changeImage($event.target.files)"
          />
        </label>
      </div>
    </div>

    <button class="btn btn-primary" type="submit">Add</button>
  </form>
</template>


<script>
import Admin from "../../apis/Admin";

import Csrf from "../../apis/Csrf";
import Uplode from "../../apis/Image";
import axios from "axios";
export default {
  data() {
    return {
      form: {
        name: "",
        email: "",
        password: "",
        // password_confirmation: "",
        room_id: "",
        avatar: "",
      },
      rooms: [],
      formimg: {
        name: "",
        file: "",
      },
      success: "",
    };
  },
  mounted() {
    Admin.getRooms().then((response) => {
      this.rooms = response.data;
    });
    // axios
    // .get("http://localhost:8000/api/rooms")
    // .then((data) => (this.rooms = data.data))
    // .catch(() => {
    // console.log("Error...");
    // });
  },
  methods: {
    adduser() {
      // Csrf.getCookie().then(()=>{
      Admin.adduser(this.form, this.$router);

      // console.log(this.rooms);
      // })
    },
    //  onChange(e) {
    //             this.formimg.file = e.target.files[0];
    //         },
    //         formSubmit(e) {
    //             e.preventDefault();
    //             let existingObj = this;

    //             const config = {
    //                 headers: {
    //                     'content-type': 'multipart/form-data'
    //                 }
    //             }

    //             let data = new FormData();
    //             data.append('file', this.file);

    //             axios.post('/upload', data, config)
    //                 .then(function (res) {
    //                     existingObj.success = res.data.success;
    //                 })
    //                 .catch(function (err) {
    //                     existingObj.output = err;
    //                 });

    //                 Admin.adduser(this.formimg)
    //         },
  },
};
</script>

<style>
</style>
