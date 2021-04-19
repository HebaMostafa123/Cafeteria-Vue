<template>
  <div class="card m-4">
    <div class="grid-container">
      <div class="order-desc card">order desc hena</div>
      <div class="card latest-order">
        latest order hena
      </div>
      <div class="products flex-container m-2">
        <product-card
          class="flex-item"
          v-for="product in products"
          v-bind:product="product"
          @updateParentData="updateData"
        ></product-card>
      </div>
    </div>
  </div>
</template>


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP&display=swap');
body {
  font-family: 'Noto Sans JP', sans-serif;
}

.grid-container {
  display: grid;
  grid-template-columns: 1fr 0.7fr 1.1fr 1.2fr;
  grid-template-rows: 0.9fr 1.3fr 0.9fr;
  gap: 0px 0px;
  grid-template-areas:
    "order-desc order-desc latest-order latest-order"
    "order-desc order-desc products products"
    "order-desc order-desc products products";
}
.order-desc {
  grid-area: order-desc;
}
.latest-order {
  grid-area: latest-order;
}
.products {
  grid-area: products;
}
.flex-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-content: flex-start;
  align-items: flex-start;
}

.flex-item {
  order: 0;
  flex: 0 2 auto;
  align-self: auto;
}
</style>


<script>
import ProductCard from "./productCard.vue";
import Product from "../../apis/Product";
import axios from "axios";

export default {
  /* Child component registration */
  components: {
    ProductCard,
  },

  /* Properties */
  props: [],

  /* Component's local data */
  data() {
    return {
      products: [],
      message: "Thinking in components",
    };
  },

  /* Watchers */
  watch: {},

  /* Computed properties */
  computed: {},

  /* Component methods */
  methods: {
      updateParentData() {
    	Vue.$emit('updateParentData', childData);
  }},
  created() {},
  mounted() {
    Product.getProducts().then((response) => {
      this.products = response.data.data;
    });
  },
  updated() {},
  unmounted() {},
};
</script>
