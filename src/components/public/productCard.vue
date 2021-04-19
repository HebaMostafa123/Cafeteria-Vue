<template>
  <head>
    <link
      href="https://fonts.googleapis.com/css?family=Bentham|Playfair+Display|Raleway:400,500|Suranna|Trocchi"
      rel="stylesheet"
    />
  </head>

  <body>
    <div class="wrapper">
      <div class="product-img">
        <img
          src="https://shop.dilmahtea.com.au/media/catalog/product/cache/2a6b0744b87cbe1990f7a65c1fd3659e/l/e/leaf-21st_1.jpg"
        />
      </div>
      <div class="product-info">
        <div class="product-text">
          <h1>{{ product.name }}</h1>
        </div>
        <div class="product-price-btn">
          <p>
            <span>{{ product.price }}</span
            >EGP
          </p>
          <button :id="product.id" type="button">add</button>
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

  methods: {},

  created() {},
  mounted() {
    console.log(this.product);
  },
  updated() {},
  unmounted() {},
};
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@200&display=swap');body {
font-family: 'Nunito Sans', sans-serif;}

.wrapper {
  height: 4rem;
  width: 11rem;
  border-radius: 7px 7px 7px 7px;
  -webkit-box-shadow: 0px 14px 32px 0px rgba(0, 0, 0, 0.15);
  -moz-box-shadow: 0px 14px 32px 0px rgba(0, 0, 0, 0.15);
  box-shadow: 0px 14px 32px 0px rgba(0, 0, 0, 0.15);
}

.product-img {
  float: left;
}

.product-img img {
  border-radius: 7px 0 0 7px;
  height: 4rem;
  width: 4rem;
}

.product-info {
  float: left;
  height: 4rem;
  width: 7rem;
  border-radius: 0 7px 10px 7px;
  background-color: #ffffff;
}

.product-text {
  height: 2rem;
  width: 7rem;
  background-color: #FCFCFC;
}

.product-text h1 {
  font-size: 1.5rem;
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
  font-size: 0.9rem;
  font-weight: lighter;
  color: #474747;
}

span {
  display: inline-block;
  height: 7vh;
  font-size: 1.5rem;
}

.product-price-btn button {
  float: right;
  margin-bottom: 0rem;
  display: inline-block;
  height: 2rem;
  width: 3.2rem;
  box-sizing: border-box;
  border: transparent;
  border-radius: 0.5rem;
  font-size: 0.7rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: #ffffff;
  background-color: #9BBCD8;
  cursor: pointer;
  outline: none;
}

.product-price-btn button:hover {
  background-color: #83ACCF;
}
</style>
