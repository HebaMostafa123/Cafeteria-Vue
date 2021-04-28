<template>
<div class="page">
  <div class="container">
    <div class="row ">
      <div class="col-12 ">
        <form class="form-inline justify-content-center" @submit.prevent="createProduct">
          <div class="form-group m-1">
            <input
              v-model="product.name"
              class="form-control"
              placeholder="Product Name"
              type="text"
              name="product_name"
            />
          </div>
          <div class="form-group m-1">
            <input
              v-model="product.price"
              class="form-control"
              placeholder="Product Price"
              type="number"
              name="product_price"
            />
          </div>
          <div class="form-group m-1">
            <select
              v-model="product.category_id"
              class="form-control"
              name="category_id"
            >
              <option value="null">Select Product Category</option>
              <option
                v-for="category in categories"
                :key="category.id"
                :value="category.id"
              >
                {{ category.label }}
              </option>
            </select>
          </div>
          <div class="form-group m-1">
            <input
              class="form-control"
              type="file"
              accept="image/*"
              image="image"
              v-on:change="changeImage($event.target.files)"
            />
          </div>
          <input
            type="Submit"
            @click="loadProducts"
            class="btn btn-success btn-sm"
          />
        </form>
        <p class="errors">
          <span v-if="'name' in errors">
            {{ errors["name"] + "|" }}
          </span>
          <span v-if="'price' in errors">{{ " | " + errors["price"] }}</span>
          <span v-if="'category_id' in errors">{{
            " | " + errors["category_id"]
          }}</span>
          <span v-if="'image' in errors">{{ " | " + errors["image"] }}</span>
        </p>
      </div>
    </div>
  </div>
  <products-component
    @loadProducts="loadProducts"
    v-bind:products="products"
  ></products-component>
  <div class="menu-footer mt-5">
    <ul class="pagination">
      <li><a type="button" @click="prev" class="prev"> Prev</a></li>
      <li>|</li>
      <li><a type="button" @click="next" class="next">Next</a></li>
    </ul>
  </div>
  </div>
</template>

<style scoped>

.page{
  height:60rem;
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
</style>
<script>
import Csrf from "../../apis/Csrf";
import Product from "../../apis/Product";
import axios from "axios";
import ProductsComponent from "./ProductsComponent.vue";
import $ from "jquery";
export default {
  components: { ProductsComponent },
  data: () => ({
    product: {
      name: null,
      price: null,
      category_id: null,
      image: null,
    },
    errors: {},
    categories: [],
    page: 1,
    lastPage: 0,
    products: [],
  }),
  methods: {
    async changeImage(files) {
      const file = files["0"];
      const data = new FormData();
      data.append("avatar", file);
      const response = await axios.post(
        "http://localhost:8000/api/upload",
        data
      );
      this.product.image = response.data.url;
    },

    validateForm() {
      this.errors = {};
      for (const key in this.product) {
        this.product[key] == null && (this.errors[key] = `${key} is required`);
      }
      return Object.keys(this.errors).length == 0 ? true : false;
    },
    createProduct() {
      Csrf.getCookie().then(() => {
        Product.createProduct(this.product).then((response) => {
          $(".form-control").val("");
          this.product.name = null;
          this.product.price = null;
          this.product.category_id = null;
          this.product.image = null;
        });
      });
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
      Product.getAllProducts(this.page).then((response) => {
        this.products = response.data.data;

        this.lastPage = response.data.last_page;
      });
    },
  },
  mounted() {
    Csrf.getCookie().then(() => {
      Product.getCategories().then((response) => {
        this.categories = response.data;
      });
    });
    this.loadProducts();
  },
};
</script>

<style>
.errors {
  color: red;
}
</style>
