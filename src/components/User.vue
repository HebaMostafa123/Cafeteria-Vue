<template>
  <h1>Hello</h1>
</template>

<script>
import User from '../apis/User'
export default {
  data(){
    return{
      user: null
    }
  },
  mounted(){
    User.auth().then((response)=>{
      this.user = response.data;
    })
  }
}
</script>

<style>

</style>