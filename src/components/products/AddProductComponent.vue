<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <form class="form-inline" @submit.prevent="createProduct">
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
              v-on:change="uploadImage"
            />
          </div>
          <input type="Submit" class="btn btn-success btn-sm" />
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
    categories: null,
  }),
  methods: {
    uploadImage(e) {
      this.product.image = e.target.files[0];
    },
    validateForm() {
      this.errors = {};
      for (const key in this.product) {
        this.product[key] == null && (this.errors[key] = `${key} is required`);
      }
      return Object.keys(this.errors).length == 0 ? true : false;
    },
    async createProduct(e) {
      if (this.validateForm()) {
        let formData = new FormData();
        for (const [key, value] of Object.entries(this.product)) {
          formData.append(key, value);
        }
        const response = await services.createProudct(formData);
        if (response.data.status == "success") {
          this.$emit("updateProducts");
          e.target.reset();
        } else {
          this.errors = response.data.message;
        }
      }
    },
    async getCategories() {
      const response = await services.getCategories();
      this.categories = response["data"]["data"];
    },
  },
  created() {
    this.getCategories();
  },
};
</script>


<style >
.errors {
  color: red;
}
</style>
