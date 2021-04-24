<template>
  <div class="card">
    <div class="card-body" v-for="order in orders" :key="order.id">
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Order Date</th>
            <th scope="col">Name</th>
            <th scope="col">Room</th>
            <th scope="col">EXT</th>
            <th scope="col">Order Total Price</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">{{ order.id }}</th>
            <td>{{ order.order.created_at }}</td>
            <td>{{ order.order.user.name }}</td>
            <td>{{ order.order.room.number }}</td>
            <td>{{ order.order.room.ext }}</td>
            <strong
              ><td>{{ order.total_price }} EGP</td></strong
            >
            <td>
              <button
                type="submit"
                class="btn btn-primary btn-lg"
                @click="changeStatus(order)"
              >
                Deliver
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="d-flex flex-row justify-content-around">
        <div class="product" v-for="product of order.order.products">
          <img class="product_image" :src="product.image" />
          <div class="product-info">
            <div class="product-price-btn">
              <p align="center">
                <span>{{ product.price }}</span> EGP
                <span> Quantity:{{ product.pivot.quantity }}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="menu-footer mt-5">
    <ul class="pagination">
      <li><a type="button" @click="prev" class="prev"> Prev</a></li>
      <li>|</li>
      <li><a type="button" @click="next" class="next">Next</a></li>
    </ul>
  </div>
</template>

<script>
import Orders from "../../../apis/Order";
// import Router from "vue-router";
export default {
  /* Component's local data */
  data() {
    return {
      orders: [],
      page: 1,
      lastPage: 0,
    };
  },
  methods: {
    changeStatus(order) {
      Orders.changeStatus(order.id, this.$router);

      Orders.getProcessingOrders().then((response) => {
        this.orders = response.data.data;
      });
    },
    async next() {
      if (this.page === this.lastPage) return;
      this.page++;
      await this.loadOrders();
    },
    async prev() {
      if (this.page === 1) return;
      this.page--;
      await this.loadOrders();
    },
    loadOrders() {
      Orders.getProcessingOrders().then((response) => {
        this.orders = response.data.data;
      });
    },
  },
  computed: {},
  mounted() {
    Orders.getProcessingOrders().then((response) => {
      this.orders = response.data;
      console.log(response.data);
    });
  },
};
</script>
<style scoped>
.product_image {
  width: 100px;
  height: 100px;
  margin-left: 50px;
  padding-right: 30px;
  padding-bottom: 20px;
}
.card-body {
  padding-bottom: 0px;
}
.product-info {
  /* float: left; */
  height: 1.5rem;
  width: 7rem;
  border-radius: 7px;
  background-color: #ffffff;
}

.product-price-btn {
  height: 2rem;
  width: 100%;
  position: relative;
  align-content: center;
}
.product-price-btn p {
  display: inline-block;
  position: absolute;
  height: 7vh;
  width: 100%;
  font-size: 0.9rem;
  font-weight: lighter;
  color: #474747;
}
span {
  display: inline-block;
  height: 7vh;
  font-size: 1.2rem;
}
.product {
  width: 200px;
  height: 200px;
  margin: 0px;
  /* text-align: center; */
}
.menu-footer {
  grid-area: menu-footer;
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
