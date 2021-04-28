<template>
<div id="orders">
  <div class="card ml-4  mr-4 mt-4">
    <div class="card-body p-0" v-for="order of orders.data">
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
            <td>{{ order.created_at }}</td>
            <td>{{ order.user.name }}</td>
            <td>{{ order.room.number }}</td>
            <td>{{ order.room.ext }}</td>

            <strong
              ><td>{{ order.total_price }} EGP</td></strong
            >
            <td>
              <button
                type="submit"
                class="btn btn-info"
                @click="changeStatus(order)"
              >
                Deliver
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <hr>
      <div class="d-flex flex-row justify-content-around">
        <div class="product" v-for="product of order.products">
          <img class="product_image" :src="product.image" />
          <div class="product-info">
              <p align="center">
                <span>{{ product.price }}</span> EGP <br>
                <span> Quantity:{{ product.pivot.quantity }}</span>
              </p>
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
  </div>
</template>

<script>
import Orders from "../../../apis/Order";
// import axios from "axios";
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
    async changeStatus(order) {
      Orders.changeStatus(order.id, this.$router);

      await Orders.getProcessingOrders(this.page).then((response) => {
        this.orders = response.data;
      });
    },
    async next() {
      if (this.page === this.lastPage) return;
      this.page++;
      await Orders.getProcessingOrders(this.page).then((response) => {
        this.orders = response.data;
      });
    },
    async prev() {
      if (this.page === 1) return;
      this.page--;
      await Orders.getProcessingOrders(this.page).then((response) => {
        this.orders = response.data;
      });
    },
  },
  computed: {},
  mounted() {
    Orders.getProcessingOrders(this.page).then((response) => {
      this.orders = response.data;
      this.lastPage = response.data.meta.last_page;
    });
  },
};
</script>
<style scoped>

.card{
  background-color:#605d86;
}
.product_image {
  width: 70px;
  height: 70px;
  border-radius: 1rem;
}
.card-body {
  background-color:white;
  margin-bottom: 15px;
  border: 2px solid lightgray;
}
.product-info {
  height: 2rem;
   width: 100%;
  border-radius: 7px;
  background-color: #ffffff;
  position: relative;
  align-content: center;
}

span {
  display: inline-block;
  height: 7vh;
  font-size: 1.0rem;
}
.product {
  width: 200px;
  height: 150px;
  margin: 0px;
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

#orders{
  height:60rem;
}
</style>
