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
        <th cscope="col">Name</th>
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
            v-bind:src="user.avatar"
            class="profile-user-img img-fluid img-circle"
            style="height: 40px; width: 40px"
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
  <nav>
    <ul class="pagination">
      <li class="page-item">
        <a class="page-link" href="javascript:void(0)" @click="prev"
          >Previouse</a
        >
      </li>
      <li class="page-item">
        <a class="page-link" href="javascript:void(0)" @click="next">Next</a>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import Admin from "../../apis/Admin";
import Csrf from "../../apis/Csrf";
import { ref, onMounted } from "@vue/runtime-core";

import axios from "axios";
export default {
  setup() {
    const users = ref([]);
    const page = ref(1);
    const lastpage = ref(0);
    const load = async () => {
      const response = await axios.get(
        `http://localhost:8000/api/pages?page=${page.value}`
      );
      users.value = response.data.data;
      console.log(users.value);

      lastpage.value = response.data.data.last_page;
    };
    onMounted(load);
    const next = async () => {
      if (page.value === lastpage.value) return;
      page.value++;
      await load();
    };
    const prev = async () => {
      if (page.value === 1) return;
      page.value--;
      await load();
    };

    return {
      users,
      // userspage,
      next,
      prev,
      // id: 0,
    };
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
