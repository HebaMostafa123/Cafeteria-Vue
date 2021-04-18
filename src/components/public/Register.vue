<template>
  <form class="form-group" @submit.prevent="register">
    <h1 class="h3 mb-3 fw-normal">Please register</h1>

    <div class="form-floating">
      <input type="text" class="form-control" id="name" placeholder="name" required v-model="form.name">
      <label for="name">name</label>
    </div>
    <div class="form-floating">
      <input type="email" class="form-control" id="email" placeholder="Email address" required v-model="form.email">
      <label for="email">Email address</label>
    </div>
    <div class="form-floating">
      <input type="password" class="form-control" id="password" placeholder="Password" required v-model="form.password">
      <label for="password">Password</label>
    </div>
    <div class="form-floating">
      <input type="password" class="form-control" id="password_confirmation" placeholder="Password Confirmation" v-model="form.password_confirmation">
      <label for="password_confirmation">Password Confirmation</label>
    </div>

    <div class="form-group col-md-4">
      <label for="room_id">Room number</label>
      <select id="room_id" class="form-control" v-model="form.room_id">
        <option selected>Choose your room number</option>
        <option v-for="room in rooms" :value="room.id">
          {{room.number}}
        </option>
      </select>
    </div>

    <div class="form-group">
    <label for="avatar">Avatar</label>
    <div class="input-group-append">
    <input type="text" class="form-control-file" name="Avatar" v-model="form.avatar"/>
    </div>
    <label class="btn btn-primary">
      Upload <input type="file" hidden @change="changeImage($event.target.files)"/>
    </label>
    </div>

    <button class="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
    <p class="mt-5 mb-3 text-muted">&copy; 2017–2021</p>
  </form>
</template>

<script>
import User from '../../apis/User';
import Csrf from '../../apis/Csrf';
import axios from 'axios';
export default {
  data(){
    return{
      form:{
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        room_id: "",
        avatar: ""
      },
      rooms: []
    };
  },
  mounted () {
    User.getRooms().then(response => {
      this.rooms = response.data;
    })
  },
  methods:{
    register(){
      Csrf.getCookie().then(()=>{
        User.register(this.form)
        console.log(this.rooms)
      })
    },
    async changeImage(files){
      const file = files[0];
      console.log(file);

      const data = new FormData();
      data.append('avatar', file);

      const response = await axios.post('upload', data);
      console.log(response);

    }
  },
}
</script>

<style>

</style>