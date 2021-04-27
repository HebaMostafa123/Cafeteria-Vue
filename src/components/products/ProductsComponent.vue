<template>
  <!-- <addProduct @updateProducts="getAllProudct" /> -->
  <table class="table table-borderd">
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
  <div class="menu-footer mt-5">
          <ul class="pagination">
            <li><a type="button" @click="prev" class="prev"> Prev</a></li>
            <li>|</li>
            <li><a type="button" @click="next" class="next">Next</a></li>
          </ul>
        </div>
</template>

<style scoped>
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
  margin:auto;
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
import services from "../services/products";
import addProduct from "./AddProductComponent";
import Product from "../../apis/Product";

export default {
  data: () => ({
    page: 1,
    lastPage: 0,
    products: [],
  }),
  oldProduct: {
    name: null,
    price: null,
  },
  methods: {
    async getAllProudct() {
      const res = await services.getAllProudct();
      const data = await res.json();
      this.products = data["data"];
    },
    updateProduct(product) {
      product.is_available = product.is_available ? 0 : 1;
      services.updateProudct(product.id, {
        is_available: String(product.is_available),
      });
    },
    async deleteProduct(id) {
      const res = await services.deleteProduct(id);
      if (res.data.status == "success") {
        this.getAllProudct();
      }
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
        console.log(this.products)
      });
    },
  },
  mounted() {
    this.loadProducts();
  },
  created() {
    this.getAllProudct();
  },
  components: {
    addProduct,
  },
};
</script>
