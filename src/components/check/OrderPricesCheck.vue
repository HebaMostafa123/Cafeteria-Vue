<template>

  <div
    class="container-fluid mt-5"
    style="padding-right: 0px;
    padding-left: 0px;"
    v-if="isOrdersExist()"
  >
    <hr>
    <h3 class="mt-3" >Orders</h3>
    <table
      class="table table-bordered border-5 table-striped mt-2 text-center"
      style="background-color:white"
    >
      <thead>
        <th>Order Date</th>
        <th>Amount</th>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order.id">
          <td>
            <div class="d-flex">
              <div class="col-1">
                <input
                  type="submit"
                  :id="order.id + '.order'"
                  class="inputOrderBtn"
                  @click.prevent="getProducts(order.id)"
                  value="+"
                />
              </div>
              <div class="col-10">
                {{ order.created_at }}
              </div>
            </div>
          </td>
          <td>{{ order.total_price }}</td>
        </tr>
      </tbody>
    </table>
    <ProductsCheck
      :products="products"
      :userExpandedPage="userExpandedPage"
      :orderExpandedPage="orderExpandedPage"
    />
  </div>
</template>

<script>
import Csrf from "../../apis/Csrf";
import Check from "../../apis/Check";
import ProductsCheck from "./ProductsCheck.vue";
export default {
  data() {
    return {
      products: [],
      orderExpandedPage: "",
    };
  },
  props: {
    orders: Object,
    userExpandedPage: Number,
  },
  components: {
    ProductsCheck,
  },
  methods: {
    isOrdersExist() {
      if (this.orders.length > 0) return true;
      return false;
    },
    getProducts(orderId) {
      const clickedBtn = document.getElementById(orderId + ".order");
      const allBtns = document.getElementsByClassName("inputOrderBtn");
      if (orderId === this.orderExpandedPage) {
        clickedBtn.value = "+";
        this.products = [];
        this.orderExpandedPage = "";
      } else {
        for (let btn of allBtns) {
          btn.value = "+";
        }
        clickedBtn.value = "-";
        Csrf.getCookie().then(() => {
          Check.getOrderProducts(orderId).then((response) => {
            this.products = response.data.data;
          });
        });
        this.orderExpandedPage = orderId;
      }
    },
  },
};
</script>

<style>
h3{
  color:orange;
}
</style>
