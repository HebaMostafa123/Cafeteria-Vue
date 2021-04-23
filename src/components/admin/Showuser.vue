<template>
  <!-- On tables -->

  <div class="container">
    <div class="row">
      <div class="col-sm-12 col-md-10 col-md-offset-1">
        <router-link
          style="width: 15%; border: 1px solid #007bff; color: #007bff"
          class="btn float-right m-3"
          :to="{
            name: 'Adduser',
          }"
          ><strong>Add User</strong></router-link
        >
        <table class="table table-hover">
          <thead>
            <tr class="table-secondary">
              <th style="color: #007bff" scope="col">Avatar</th>
              <th style="color: #007bff" cscope="col">Name</th>
              <th style="color: #007bff" scope="col">Email</th>
              <th style="color: #007bff" scope="col">room_id</th>
              <th style="color: #007bff" scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr class="table-success" v-for="user in users" :key="user.id">
              <td>
                <img
                  v-bind:src="user.avatar"
                  class="profile-user-img img-fluid img-circle"
                  style="width: 50px; height: 50px; border-radius: 25px"
                />
              </td>
              <td class="text-center">
                <strong> {{ user.name }}</strong>
              </td>
              <td class="text-center">
                <strong> {{ user.email }}</strong>
              </td>

              <td class="text-center">
                <strong> {{ user.room_id }}</strong>
              </td>
              <td>
                <router-link
                  class="btn btn-warning m-2"
                  style="border-radius: 25px; width: 35%; color: white"
                  :to="{
                    name: 'Edituser',
                    params: { id: user.id },
                  }"
                  >Edit</router-link
                >
                <a
                  class="btn btn-danger"
                  @click="deleteuser(user.id)"
                  style="border-radius: 25px"
                  >Remove</a
                >
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <nav>
    <ul class="pagination" style="margin-left: 38%">
      <li class="page-item">
        <a class="page-link" href="javascript:void(0)" @click="prev">
          <strong> Prev </strong>
        </a>
      </li>
      <li class="page-item">
        <a class="page-link" href="javascript:void(0)" @click="next">
          <strong> Next </strong>
        </a>
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
