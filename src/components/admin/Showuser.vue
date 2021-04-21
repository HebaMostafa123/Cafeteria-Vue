<template>
  <!-- On tables -->

  <router-link
    class="btn btn-success float-right m-4"
    :to="{
      name: 'Adduser',
    }"
    >Add User</router-link
  >

  <table class="table table-secondary">
    <thead>
      <tr class="table-secondary">
        <th scope="col">Name</th>
        <th scope="col">Email</th>
        <th scope="col">Avatar</th>
        <th scope="col">room_id</th>
        <th scope="col">Action</th>
      </tr>
    </thead>
    <tbody>
      <tr class="table-success" v-for="user in users" :key="user.id">
        <td class="text-center">
          {{ user.name }}
        </td>
        <td class="text-center">
          {{ user.email }}
        </td>
        <td>
          <img
            :src="require(`../../assets/avatars/${user.avatar}`)"
            width="70"
            height="50"
          />
        </td>
        <td class="text-center">
          {{ user.room_id }}
        </td>
        <td>
          <router-link
            class="btn btn-warning m-2 w-25"
            :to="{
              name: 'Edituser',
              params: { id: user.id },
            }"
            >Edit</router-link
          >
          <a class="btn btn-danger" @click="deleteuser(user.id)">Delete</a>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import Admin from "../../apis/Admin";
import Csrf from "../../apis/Csrf";

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
      users: [],
      // id: 0,
    };
  },
  mounted() {
    Admin.getuser().then((response) => {
      this.users = response.data;
    });
    // axios
    // .get("http://localhost:8000/api/rooms")
    // .then((data) => (this.rooms = data.data))
    // .catch(() => {
    // console.log("Error...");
    // });
  },
  methods: {
    deleteuser(id) {
      // Csrf.getCookie().then(()=>{
      Admin.deleteuser(id, this.users);

      // })
    },
  },
};
</script>

<style>
</style>
