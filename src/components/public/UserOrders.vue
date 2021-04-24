<template>
  <head>
    <link
      href="https://fonts.googleapis.com/css?family=Bentham|Playfair+Display|Raleway:400,500|Suranna|Trocchi"
      rel="stylesheet"
    />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/icon?family=Material+Icons"
    />
  </head>
  <div class="page">
    <h1>My Orders</h1>
    <form class=" date row">
      <div class="col-6">
        <div class="form-group row">
          <label for="example-date-input" class="col-6 col-form-label"
            >Date From</label
          >
          <div class="col-6">
            <input
              @change="changeFromDate"
              class="form-control"
              type="date"
              :value="fromDate"
              id="example-date-input"
            />
          </div>
        </div>
      </div>
      <div class="col-6">
        <div class="form-group row">
          <label for="example-date-input" class="col-6 col-form-label"
            >Date To</label
          >
          <div class="col-6">
            <input
              @change="changeToDate"
              class="form-control"
              type="date"
              :value="toDate"
              id="example-date-input"
            />
          </div>
        </div>
      </div>
    </form>
    <p class="error">{{ error }}</p>
    <div class="card m-4">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Order Date</th>
            <th scope="col">Status</th>
            <th scope="col">Amount</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in orders" :value="order.id">
            <th scope="row">{{ order.created_at }}</th>
            <td>{{ order.status }}</td>
            <td>{{ order.total }}</td>
            <td>
              <button
                @click="cancelOrder"
                v-if="order.status == 'processing'"
                class="btn btn-warning"
              >
                Cancel
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@200&display=swap");

.page {
  font-family: "Poppins", sans-serif;
  color: white;
}
.page h1 {
  color: white;
}

.error {
  color: orange;
  font-size: 1rem;
}

.date {
  padding-right: 9rem;
  padding-top: 1rem;
}
</style>

<script>
import Order from "../../apis/Order";
import User from "../../apis/User";

export default {
  data() {
    return {
      fromDate: "",
      toDate: "",
      error: "",
      orders: [],
      user_id: 0,
      //   error: "Invalid Time Frame",
    };
  },
  components: {},
  mounted() {
    this.fromDate = "2021-04-01";
    this.toDate = new Date().toJSON().slice(0, 10);
    User.auth().then((response) => {
      this.user_id = response.data.id;
      this.getOrders();
    });
  },
  methods: {
    changeToDate($event) {
      this.error = "";
      this.toDate = event.currentTarget.value;
      if (this.toDate < this.fromDate) {
        this.error = "Invalid time frame";
      }
      if (this.error.length === 0) {
        this.getOrders();
      }
    },
    changeFromDate($event) {
      this.error = "";
      this.fromDate = event.currentTarget.value;
      if (this.toDate < this.fromDate) {
        this.error = "Invalid time frame";
      }
      if (this.error.length === 0) {
        this.getOrders();
      }
    },
    cancelOrder($event) {},
    getOrders() {
      this.orders = Order.getUserOrders(
        this.user_id,
        this.fromDate,
        this.toDate
      ).then((response) => {
        this.orders = response.data.data;
        console.log(this.orders);
      });
    },
  },
};
</script>
