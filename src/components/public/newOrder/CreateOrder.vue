<template>
  <head>
    <link
      href="https://fonts.googleapis.com/css?family=Bentham|Playfair+Display|Raleway:400,500|Suranna|Trocchi"
      rel="stylesheet"
    />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/icon?family=Material+Icons"
    />
  </head>
  <div id="create-order">
    <div class="card m-4 ">
      <div class="grid-container">
        <div class="order-desc card m-4">
          <orderDesc
            :items="orderItems"
            :userId="user_id"
            @removeProduct="removeProductFromOrder"
            :admin="admin"
          ></orderDesc>
        </div>
        <div class="card latest-order mt-4 mb-2 mr-4 ">
          <div class="select-user" v-if="admin">
            <form>
              <h5>Select a User</h5>
              <select @change="setUserId($event)" class="form-control" required>
                <option value="" disabled selected hidden>Select User</option>
                <option v-for="user in users" :value="user.id">
                  {{ user.name }}
                </option>
              </select>
            </form>
          </div>
          <div v-else>
            <h4 class="mb-0">Latest Order</h4>
            <div class="flex-products mb-3">
              <product-card
                class="flex-item ml-2 mt-2 latest-item"
                v-for="item in latestOrderItems"
                v-bind:product="item"
                @addProduct="addProductToOrder"
              ></product-card>
            </div>
          </div>
        </div>
        <div class="products ml-3 mr-3">
          <div class="menu-header">
            <h4>Menu</h4>
          </div>
          <div class="menu-items flex-products">
            <product-card
              class="flex-item ml-2 mt-2"
              v-for="product in products"
              v-bind:product="product"
              @addProduct="addProductToOrder"
            ></product-card>
          </div>
          <div class="menu-footer mt-5">
            <ul class="pagination">
              <li><a type="button" @click="prev" class="prev"> Prev</a></li>
              <li>|</li>
              <li><a type="button" @click="next" class="next">Next</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@200&display=swap");
#create-order {
  height: 70rem;
}
h4 {
  font-family: "Poppins", sans-serif;
}

.grid-container {
  border-radius: 7px 7px 7px 7px;
  -webkit-box-shadow: 0px 14px 32px 0px rgba(0, 0, 0, 0.15);
  -moz-box-shadow: 0px 14px 32px 0px rgba(0, 0, 0, 0.15);
  box-shadow: 0px 14px 32px 0px rgba(0, 0, 0, 0.15);
  display: grid;
  grid-template-columns: 1fr 0.7fr 1.1fr 1.2fr;
  grid-template-rows: 0.5fr 1.2fr 0.3fr;
  gap: 0px 0px;
  grid-template-areas:
    "order-desc order-desc latest-order latest-order"
    "order-desc order-desc products products"
    "order-desc order-desc products products";
}
.order-desc {
  grid-area: order-desc;
  background-color: #e7f1f9;
}
.latest-order {
  grid-area: latest-order;
  font-family: "Poppins", sans-serif;
  align-items: center;
}

.flex-products {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-content: flex-start;
  align-items: flex-start;
  padding-top: 1rem;
}

.products {
  grid-area: products;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 0.1fr 1.6fr 0.4fr;
  gap: 0px 0px;
  grid-template-areas:
    "menu-header menu-header menu-header menu-header"
    "menu-items menu-items menu-items menu-items"
    "menu-footer menu-footer menu-footer menu-footer";
}

.menu-header {
  grid-area: menu-header;
}
.menu-items {
  grid-area: menu-items;
}
.menu-footer {
  grid-area: menu-footer;
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
  margin: auto;
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

.select-user {
  width: 25rem;
  margin-top: 1.5rem;
}
</style>

<script>
import ProductCard from "./ProductCard.vue";
import OrderDesc from "./OrderDesc.vue";
import Product from "../../../apis/Product";
import Order from "../../../apis/Order";
import User from "../../../apis/User";
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
      page: 1,
      lastPage: 0,
      latestOrderItems: [],
      users: [],
      admin: 1,
      user_id: -1,
    };
  },

  /* Watchers */
  watch: {},

  /* Computed properties */
  computed: {},

  /* Component methods */
  methods: {
    addProductToOrder(value) {
      const exists = this.orderItems.some((x) => x.id === +value);
      if (!exists) {
        const newItem = this.products.find((x) => x.id === +value);
        newItem.quantity = 1;
        this.orderItems.push(newItem);
      }
    },
    removeProductFromOrder(value) {
      const index = this.orderItems.map((item) => item.id).indexOf(+value);
      this.orderItems.splice(index, 1);
    },
    async next() {
      if (this.page === this.lastPage) return;
      this.page++;
      await this.loadProducts();
    },
    async prev() {
      if (this.page === 1) return;
      this.page--;
      await this.loadProducts();
    },
    loadProducts() {
      Product.getProducts(this.page).then((response) => {
        this.products = response.data.data;
        this.lastPage = response.data.meta.last_page;
      });
    },
    async getLatestItems() {
      this.latestOrderItems = await Order.getLatestOrder(this.user_id).then(
        (response) => response.data.data
      );
      console.log(this.latestOrderItems);
    },
    setUserId($event) {
      this.user_id = +event.currentTarget.value;
      console.log(this.user_id);
    },
  },
  mounted() {
    this.loadProducts();
    User.auth()
      .then((response) => {
        this.user_id = response.data.id;
        this.admin = response.data.is_admin;
      })
      .then(() => {
        if (!this.admin) this.getLatestItems();
        else this.user_id = -1;
      });
    this.users = Order.getUsernames().then((response) => {
      this.users = response.data.data;
    });
  },
  updated() {},
  unmounted() {},
};
</script>
