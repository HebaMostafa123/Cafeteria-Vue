<template>
  <div id="page">
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
                  <option value="" disabled selected hidden
                    >Select Product Category</option
                  >
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
  </div>
</template>

<style scoped>
#page {
  height: 40rem;
}

h2 {
  color: white;
}
</style>

<script>
import Product from "../../apis/Product";

export default {
  data: () => ({
    product: {
      id: null,
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
      Product.getProduct(id).then((response) => {
        this.product.name = response.data.data.name;
        this.product.price = response.data.data.price;
        this.product.id = response.data.data.id;
        this.product.category_id = response.data.data.category_id;
        this.product.image = response.data.data.image;
      });
    },
    async getCategories() {
      Product.getCategories().then(
        (response) => (this.categories = response.data)
      );
    },
    uploadImage(e) {
      this.product.image = e.target.files[0];
      this.hasImage = true;
    },
    validateForm() {
      this.errors = {};
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
          Product.updateProduct(this.product.id, formData).then((response) => {
            console.log(response.data.status);
            response.data.status == "success"
              ? this.$router.push("/products")
              : (this.errors = response.data.message);
          });
        } else {
          response = await Product.updateProduct(this.product.id, this.product);
          response.data.status == "success"
              ? this.$router.push("/products")
              : (this.errors = response.data.message);
        }
      }
    },
  },
  mounted() {
    this.getProduct(this.$route.params.id);
    this.getCategories();
  },
};
</script>
