<template>
  <router-view />
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&display=swap");

body {
  font-family: "Poppins", sans-serif;
}
#app {
  font-family: "Poppins", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;]
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
  background: rgb(119, 0, 223);
  background: radial-gradient(
    circle,
    rgba(119, 0, 223, 1) 0%,
    rgba(27, 183, 193, 1) 100%
  );
}

#nav a {
  font-weight: bold;
  text-decoration: none;
  color: #ffffff;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
