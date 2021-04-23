<template>
  <body>
    <div class="wrapper">
      <div class="product-text">
        <h1 align="center">{{ product.name.slice(0, 18) }}</h1>
      </div>
      <div class="product-img">
        <img :src="product.image" />
      </div>
      <div class="product-info">
        <div class="product-price-btn">
          <p align="center">
            <span>{{ product.price }}</span
            >EGP
          </p>
          <button @click="addProduct($event)" :id="product.id" type="button">
            add
          </button>
        </div>
      </div>
    </div>
  </body>
</template>

<script>
export default {
  /* Child component registration */
  components: {},

  /* Properties */
  props: {
    product: Object,
    count: Number,
  },

  /* Component's local data */
  data() {
    return {
      message: "Thinking in components",
    };
  },
  /* Watchers */
  watch: {},

  /* Computed properties */
  computed: {},

  /* Component methods */
  methods: {
    addProduct(event) {
      this.$emit("addProduct", event.currentTarget.id);
    },
  },

  created() {},
  mounted() {},
  updated() {},
  unmounted() {},
};
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@200&display=swap");
body {
  font-family: "Poppins", sans-serif;
}

.wrapper {
  height: 10.1rem;
  width: 7rem;
  border-radius: 5px;
  -webkit-box-shadow: 0px 14px 32px 0px rgba(0, 0, 0, 0.15);
  -moz-box-shadow: 0px 14px 32px 0px rgba(0, 0, 0, 0.15);
  box-shadow: 0px 14px 32px 0px rgba(0, 0, 0, 0.15);
}

.product-img {
  float: top;
}

.product-img img {
  border-radius: 7px 7px 7px 7px;
  height: 6rem;
  width: 7rem;
}

.product-info {
  float: left;
  height: 1.5rem;
  width: 7rem;
  border-radius: 7px;
  background-color: #ffffff;
}

.product-text {
  height: 2.5rem;
  width: 7rem;
  background-color: #fcfcfc;
}

.product-text h1 {
  font-size: 1.1rem;
  color: #474747;
}

.product-price-btn {
  height: 2rem;
  width: 100%;
  position: relative;
}

.product-price-btn p {
  display: inline-block;
  position: absolute;
  height: 7vh;
  width: 4rem;
  font-size: 0.9rem;
  font-weight: lighter;
  color: #474747;
}

span {
  display: inline-block;
  height: 7vh;
  font-size: 1.2rem;
}

.product-price-btn button {
  float: right;
  margin-bottom: 0rem;
  display: inline-block;
  height: 1.6rem;
  width: 3.2rem;
  box-sizing: border-box;
  border: transparent;
  border-radius: 0.5rem;
  font-size: 0.7rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: #ffffff;
  background-color: #9bbcd8;
  cursor: pointer;
  outline: none;
}

.product-price-btn button:hover {
  background-color: #83accf;
}
</style>
