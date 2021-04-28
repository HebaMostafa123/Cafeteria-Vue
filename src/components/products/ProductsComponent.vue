<template>
  <!-- <addProduct @updateProducts="getAllProudct" /> -->
  <table class="table table-borderd table-light">
    <thead>
      <tr>
        <th>Proudct</th>
        <th>Price</th>
        <th>image</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="product in products" :key="product.id">
        <td>{{ product.name }}</td>
        <td>{{ product.price }}</td>
        <td>
          <img style="width: 50px" :src="product.image" alt="" />
        </td>
        <td>
          <button class="btn btn-link" @click="updateProduct(product)">
            {{ product.is_available ? "available" : "unavailable" }}
          </button>
          <router-link
            :to="'/product/' + product.id + '/' + product.is_available"
          >
            <button class="btn btn-link">edit</button>
          </router-link>
          <button class="btn btn-link" @click="deleteProduct(product.id)">
            delete
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import addProduct from "./AddProductComponent";
import Product from "../../apis/Product";
import VueSwal from "vue-swal";
export default {
  data() {
    return {
      page: 1,
      lastPage: 0,
      oldProduct: {
        name: null,
        price: null,
      },
    };
  },

  props: {
    products: Array,
  },
  methods: {
    updateProduct(product) {
      const formData = new FormData();
      formData.append("is_available", product.is_available);
      product.is_available = product.is_available ? 0 : 1;
      Product.updateAvailabilityProduct(product.id, formData);
    },

    loadProducts() {
      this.$emit("loadProducts");
    },
    deleteProduct(id) {
      this.$swal
        .fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        })
        .then((result) => {
          if (result.value) {
            Product.deleteProduct(id, this.products);
            this.$swal.fire(
              "Deleted!",
              "Product is deleted successfully",
              "success"
            );
          }
        });
    },
  },
  mounted() {},
  created() {},
};
</script>
