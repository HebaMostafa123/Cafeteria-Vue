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
            <td>
              <button type="submit" class="btn btn-primary btn-lg">
                Deliver
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-for="product of order.products">
        <img class="product_image d-flex flex-row" :src="product.image" />
        <div class="product-info">
          <div class="product-price-btn">
            <p align="center">
              <span>{{ product.price }}</span
              >EGP
            </p>
          </div>
        </div>
        <span> Quantity:{{ product.pivot.quantity }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import Orders from "../../../apis/Order";

export default {
  /* Component's local data */
  data() {
    return {
      orders: [],
    };
  },
  methods: {
    // formatDate(date) {
    //   console.log(date);
    //   return moment(date).format("dd.mm.YYYY");
    // },
  },
  computed: {},
  mounted() {
    Orders.getProcessingOrders().then((response) => {
      console.log(response.data.data);
      this.orders = response.data.data;
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
  float: left;
  height: 1.5rem;
  width: 7rem;
  border-radius: 7px;
  background-color: #ffffff;
}

.product-price-btn {
  height: 2rem;
  width: 100%;
  position: relative;
}
.product-price-btn p {
  display: inline-block;
  position: absolute;
  height: 7vh;
  width: 4rem;
  font-size: 0.9rem;
  font-weight: lighter;
  color: #474747;
}
span {
  display: inline-block;
  height: 7vh;
  font-size: 1.2rem;
}
</style>
