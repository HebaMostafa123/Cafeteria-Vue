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
          <router-link :to="'/product/' + product.id">
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
import services from "../services/products";
import addProduct from "./AddProductComponent";
import Product from "../../apis/Product";

export default {
  data() {
    return {
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
      product.is_available = product.is_available ? 0 : 1;
      Product.updateProudct(product.id, {
        is_available: String(product.is_available),
      });
    },
    async deleteProduct(id) {
      const res = await services.deleteProduct(id);
      if (res.data.status == "success") {
        this.getAllProudct();
      }
    },
    loadProducts() {
      this.$emit("loadProducts");
    },
  },
  mounted() {},
  created() {},
};
</script>
