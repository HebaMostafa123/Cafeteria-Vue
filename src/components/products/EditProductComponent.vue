<template>
  <div class="container">
    <h2>Edit Product</h2>
    <div class="row">
      <div class="col-12">
        <div class="card">
          <form class="form" @submit.prevent="updateProduct">
            <div class="form-group m-1">
              <label for="">Name</label>
              <input
                v-model="product.name"
                class="form-control"
                placeholder="Product Name"
                type="text"
                name="product_name"
              />
              <p class="errors" v-if="'name' in errors">
                {{ errors["name"] + "" }}
              </p>
            </div>
            <div class="form-group m-1">
              <label for="">Price</label>
              <input
                v-model="product.price"
                class="form-control"
                placeholder="Product Price"
                type="number"
                name="product_price"
              />
              <p class="errors" v-if="'price' in errors">
                {{ errors["price"] + "" }}
              </p>
            </div>
            <div class="form-group m-1">
              <label for="">Category</label>
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
              <p class="errors" v-if="'category_id' in errors">
                {{ errors["category_id"] + "" }}
              </p>
            </div>
            <div class="form-group m-1">
              <label for="">image</label>
              <input
                class="form-control"
                type="file"
                accept="image/*"
                image="image"
                v-on:change="uploadImage"
              />
              <p class="errors" v-if="'image' in errors">
                {{ errors["image"] + "" }}
              </p>
            </div>
            <input type="Submit" class="btn btn-success btn-sm" />
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import services from "../services/products";
export default {
  data: () => ({
    product: {
      name: null,
      price: null,
      category_id: null,
      image: null,
    },
    errors: {},
    hasImage: false,
    categories: null,
  }),
  methods: {
    async getProduct(id) {
      const response = await services.getProudctById(id);
      this.product = response["data"]["data"];
    },
    async getCategories() {
      const response = await services.getCategories();
      this.categories = response["data"]["data"];
    },
    uploadImage(e) {
      this.product.image = e.target.files[0];
      this.hasImage = true;
    },
    validateForm() {
      this.errors = {};
      //   let isValid = this.product.category_id != "null" ;
      // //   || this.product.price != "";
      //   console.log(isValid);
      for (const key in this.product) {
        this.product[key] == null && (this.errors[key] = `${key} is required`);
      }
      return Object.keys(this.errors).length == 0 ? true : false;
    },
    async updateProduct() {
      if (this.validateForm()) {
        let response;
        if (this.hasImage) {
          let formData = new FormData();
          for (const [key, value] of Object.entries(this.product)) {
            formData.append(key, value);
          }
          response = await services.updateProudct(this.product.id, formData);
        } else {
          response = await services.updateProudct(
            this.product.id,
            this.product
          );
        }
        response["data"]["status"] == "success"
          ? this.$router.push("/products")
          : (this.errors = response["data"]["message"]);
      }
    },
  },
  created() {
    this.getProduct(this.$route.params.id);
    this.getCategories();
  },
};
</script>
