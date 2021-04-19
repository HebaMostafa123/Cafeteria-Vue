<template>
  <div class="card m-4">
    <div class="grid-container">
      <div class="order-desc card m-4"><orderDesc></orderDesc></div>
      <div class="card latest-order mt-4 mb-2 mr-2 ">
        <p>{{count}}</p>
      </div>
      <div class="products flex-container ml-3 mr-3">
      
        <product-card
          class="flex-item "
          v-for="product in products"
          v-bind:product="product"
          @setParentComponentDetails="setDetailsForComponent"
          :count="iscount"
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
    border-radius: 7px 7px 7px 7px;
  -webkit-box-shadow: 0px 14px 32px 0px rgba(0, 0, 0, 0.15);
  -moz-box-shadow: 0px 14px 32px 0px rgba(0, 0, 0, 0.15);
  box-shadow: 0px 14px 32px 0px rgba(0, 0, 0, 0.15);
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
import OrderDesc from "./orderDesc.vue";
import Product from "../../apis/Product";
import axios from "axios";

export default {
  /* Child component registration */
  components: {
    ProductCard,
    OrderDesc,
  },

  /* Properties */
  props: [],

  /* Component's local data */
  data() {
    return {
      products: [],
      message: "Thinking in components",
      count:0,
      
    };
  },

  /* Watchers */
  watch: {},

  /* Computed properties */
  computed: {},

  /* Component methods */
  methods: {
            setDetailsForComponent() {    
      this.count++; 
      }   },
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
