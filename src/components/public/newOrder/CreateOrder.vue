<template>
  <head>
    <link
      href="https://fonts.googleapis.com/css?family=Bentham|Playfair+Display|Raleway:400,500|Suranna|Trocchi"
      rel="stylesheet"
    />
    
  </head>
  <div class="card m-4">
    <div class="grid-container">
      <div class="order-desc card m-4">
        <orderDesc :items="orderItems"></orderDesc>
      </div>
      <div class="card latest-order mt-4 mb-2 mr-2 ">
        <p>{{ count }} {{ page }} {{ lastPage }}</p>
      </div>
      <div class="products ml-3 mr-3">
        <div class="flex-products mb-3">
          <product-card
            class="flex-item ml-2 mt-2"
            v-for="product in products"
            v-bind:product="product"
            @addProduct="addProductToOrder"
            :count="count"
          ></product-card>
        </div>
        <div>
          <ul class="pagination">
            <li><a type="button" @click="prev" class="prev"> Prev</a></li>
            <li>|</li>
            <li><a type="button" @click="next" class="next">Next</a></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
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

.flex-products {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-content: flex-start;
  align-items: flex-start;
}

.products {
  grid-area: products;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  align-content: center;
}

.flex-item {
  order: 0;
  flex: 0 2 auto;
  align-self: auto;
}

.pagination {
  width: 8rem;
  height: 3rem;
  align-items: center;
}
ul {
  position: relative;
  background: #fff;
  display: flex;
  border-radius: 50px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  text-align: center;
  font-family: "Poppins", sans-serif;
}
ul li:first-child {
  margin-left: 1.2rem;
  font-weight: 700;
  font-size: 2rem;
}
ul li {
  list-style: none;
  line-height: 50px;
  margin: 0 5px;
}

ul li a {
  font-size: 1rem;
  display: block;
  text-decoration: none;
  color: #383838;
  font-weight: 600;
  border-radius: 50%;
}

</style>

<script>
import ProductCard from "./ProductCard.vue";
import OrderDesc from "./OrderDesc.vue";
import Product from "../../../apis/Product";
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
      orderItems: [],
      count: 0,
      page: 1,
      lastPage: 0,
    };
  },

  /* Watchers */
  watch: {},

  /* Computed properties */
  computed: {},

  /* Component methods */
  methods: {
    addProductToOrder(value) {
      const exists = this.orderItems.some(x => x.id === +value);
      if (!exists) this.orderItems.push(this.products.find(x => x.id === +value));
      console.log(this.orderItems);
    },

    async next() {
      if (this.page === this.lastPage) return;
      this.page++;
      await this.load();
    },
    async prev() {
      if (this.page === 1) return;
      this.page--;
      await this.load();
    },
    load() {
      Product.getProducts(this.page).then((response) => {
        this.products = response.data.data;
        this.lastPage = response.data.meta.last_page;
      });
    },
  },
  mounted() {
    this.load();
  },
  updated() {},
  unmounted() {},
};
</script>
