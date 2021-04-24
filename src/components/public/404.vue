<template>
  <body>
    <div class="atef"></div>
    <button @click="goHome" class="btn btn-warning">Go Back Home</button>
  </body>
</template>

<script>
export default {
    methods: {
    goHome(){
      this.$router.push('/');
    },
    }
}
</script>

<style scoped>
.atef {
  width: 25rem;
  height: 25rem;
  margin: auto;
  margin-top: 3rem;
  background-image: url("~@/assets/404.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: block;
}
.btn {
  margin-left: 33rem;
  margin-top: 2rem;
}
</style>
