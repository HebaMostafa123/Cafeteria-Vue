<template>
<body>
<div class="home">
<button @click="redirectToOrder" class="btn btn-success">Order Now</button>
  </div>
  </body>
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
    });
  },
  methods: {
    redirectToOrder(){
      this.$router.push("/order");
    }
  },
}
</script>

<style scoped>
.home{
  width: 73.5rem;
  height: 33.5rem;
  background-image: url('~@/assets/bg.png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
.btn{
width:12.5rem;
height:3.5rem;
  position:absolute;
  left:45.6rem;
  top:24.0rem;
-webkit-box-shadow: -12px 21px 10px -6px rgba(0,0,0,0.28); 
box-shadow: -12px 21px 10px -6px rgba(0,0,0,0.28);
}
</style>