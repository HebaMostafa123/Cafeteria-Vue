<template>
<div class="home col-5 mx-auto py-5 mt-5">
    <h1 class="text-center">Please Register</h1>
    <div class="card shadow">
      <div class="card-body">
        <div class="form-group">
          <label for="name">Name</label>
          <input type="text" class="form-control" id="name" placeholder="Name" v-model="form.name">
          <span class="text-danger" v-if="errors.name">
            {{ errors.name[0] }}
          </span>
        </div>

        <div class="form-group">
          <label for="email">Email address</label>
          <input type="email" class="form-control" id="email" placeholder="Email address" required v-model="form.email">
          <span class="text-danger" v-if="errors.email">
            {{ errors.email[0] }}
          </span>
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" class="form-control" id="password" placeholder="Password" required v-model="form.password">
          <span class="text-danger" v-if="errors.password">
            {{ errors.password[0] }}
          </span>
        </div>

        <div class="form-group">
          <label for="password_confirmation">Confirm Password</label>
          <input type="password" class="form-control" id="password_confirmation" placeholder="Password Confirmation" v-model="form.password_confirmation">
          <span class="text-danger" v-if="errors.password_confirmation">
            {{ errors.password_confirmation[0] }}
          </span>
        </div>

        <div class="form-group">
          <label for="room_id">Room number</label>
          <select id="room_id" class="form-control" v-model="form.room_id">
            <option v-for="room in rooms" :value="room.id">{{room.number}}</option>
          </select>
          <span class="text-danger" v-if="errors.room_id">
            {{ errors.room_id[0] }}
          </span>
        </div>

        <div class="form-group">
          <label for="ext">Extension</label>
          <input type="text" class="form-control" name="ext" :value="getCurrentRoomExtension()" readonly/>
        </div>

        <div class="form-group">
          <label for="avatar">Avatar</label>
          <div class="row">
            <div class="col-9">
              <input type="text" class="form-control" name="Avatar" readonly v-model="form.avatar"/>
            </div>
            <div class="col-3">
              <label class="btn btn-primary">
                Upload <input type="file" hidden @change="changeImage($event.target.files)"/>
              </label>
            </div>
          </div>
          <span class="text-danger" v-if="errors.avatar">
            {{ errors.avatar[0] }}
          </span>
        </div>

        <button type="submit" @click.prevent="register" class="btn btn-primary btn-block">
          Register
        </button>
      </div>
    </div>
  </div>


  <!-- <form class="form-group" @submit.prevent="register">
    <h1 class="h3 mb-3 fw-normal">Please register</h1>
    


    

    <button class="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
    <p class="mt-5 mb-3 text-muted">&copy; 2017–2021</p>
  </form> -->
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
      rooms: [],
      errors: []
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
        User.register(this.form).catch((error)=>{
          if (error.response.status === 422) {
            this.errors = error.response.data.errors;
          }
        })
      })
    },
    getCurrentRoomExtension(){
      const currentRoom = this.rooms.find(element => element.id===this.form.room_id);
      if(currentRoom) return currentRoom.ext;
    },
    async changeImage(files){
      try {
        const file = files[0];
  
        const data = new FormData();
        data.append('avatar', file);
  
        const response = await axios.post('http://localhost:8000/api/upload', data);
        this.form.avatar = response.data.url;
      } catch (error) {
        this.errors = error.response.data.errors;
      }

    }
  },
}
</script>

<style>
body{
  background-image: url('~@/assets/registration-background.jpeg');
   /* Full height */
  /* height: 100%; */
  /* Center and scale the image nicely */
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
}
</style>