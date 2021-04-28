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
              <div class="form-group">
                <label for="avatar">Avatar</label>
                <div class="row">
                  <div class="col-9">
                    <input
                      type="text"
                      class="form-control"
                      name="Avatar"
                      readonly
                      v-model="product.image"
                    />
                  </div>
                  <div class="col-3">
                    <label class="btn btn-primary">
                      Upload
                      <input
                        type="file"
                        hidden
                        @change="changeImage($event.target.files)"
                      />
                    </label>
                  </div>
                </div>
                <span class="text-danger" v-if="errors.avatar">
                  {{ errors.avatar[0] }}
                </span>
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
import axios from "axios";
export default {
  data: () => ({
    baseURL: "http://localhost:8000/api/",
    product: {
      id: null,
      name: null,
      price: null,
      category_id: null,
      image: null,
    },
    errors: [],
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
    async changeImage(files) {
      try {
        const file = files[0];

        const data = new FormData();
        data.append("avatar", file);

        const response = await axios.post(
          "http://localhost:8000/api/upload",
          data
        );

        this.product.image = response.data.url;
        // console.log(response.data);
      } catch (error) {
        this.errors = error.response.data.errors;
      }
    },
    validateForm() {
      this.errors = {};
      for (const key in this.product) {
        this.product[key] == null && (this.errors[key] = `${key} is required`);
      }
      return Object.keys(this.errors).length == 0 ? true : false;
    },

    updateProduct() {
      const formData = new FormData();
      formData.append("name", this.product.name);
      formData.append("price", this.product.price);
      formData.append("category_id", this.product.category_id);
      formData.append("is_available", this.$route.params.is_available);
      formData.append("image", this.product.image);
      formData.append("_method", "PATCH");
      axios
        .post(this.baseURL + `products/${this.$route.params.id}`, formData)
        .then((res) => {
          // console.log(res);
          this.$router.push({
            name: "products",
          });
        })
        .catch((e) => {
          if (e.response.status === 422) {
            this.errors = e.response.data.errors;
          }
        });
    },
  },
  mounted() {
    this.getProduct(this.$route.params.id);
    this.getCategories();
  },
};
</script>
