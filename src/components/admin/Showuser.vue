<template>
  <!-- On tables -->
  <div id="users">
    <div class="container">
      <div class="row">
        <div class="m-auto col-sm-12 col-md-10 col-md-offset-1">
          <router-link
            style="width: 15%"
            class="btn btn-info float-right m-3"
            :to="{
              name: 'Adduser',
            }"
            ><strong>Add User</strong></router-link
          >
          <table class="table table-hover">
            <thead>
              <tr class="table-secondary">
                <th style="color: #212529" scope="col">Avatar</th>
                <th style="color: #212529" cscope="col">Name</th>
                <th style="color: #212529" scope="col">Email</th>
                <th style="color: #212529" scope="col">Room number</th>
                <th style="color: #212529" scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr class="table-light" v-for="user in users" :key="user.id">
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
                <td width="190px">
                  <router-link
                    class="btn btn-warning m-1"
                    :to="{
                      name: 'Edituser',
                      params: {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        room_id: user.room_id,
                        avatar: user.avatar,
                      },
                    }"
                    >Edit</router-link
                  >
                  <a
                    class="btn btn-danger"
                    @click="deleteuser(user.id)"
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
      <ul class="pagination" style="margin-left: 45%">
        <li class="page-item">
          <a
            style="color: #212529"
            class="page-link"
            href="javascript:void(0)"
            @click="prev"
          >
            <strong> Prev </strong>
          </a>
        </li>
        <li class="page-item">
          <a
            style="color: #212529"
            class="page-link"
            href="javascript:void(0)"
            @click="next"
          >
            <strong> Next </strong>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script lang="ts">
import Admin from "../../apis/Admin";
import Csrf from "../../apis/Csrf";
import { ref, onMounted } from "@vue/runtime-core";
import Vue from "vue";
import VueSwal from "vue-swal";
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
      lastpage.value = response.data.last_page;
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
      next,
      prev,
    };
  },
  methods: {
    deleteuser(id) {
      this.$swal
        .fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        })
        .then((result) => {
          if (result.value) {
            Admin.deleteuser(id, this.users);
            this.$swal.fire(
              "Deleted!",
              "Product is deleted successfully",
              "success"
            );
          }
        });
    },
  },
};
</script>

<style>
#users {
  height: 40rem;
}
</style>
