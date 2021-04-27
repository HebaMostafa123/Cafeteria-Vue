<template>
  <head>
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/icon?family=Material+Icons"
    />
  </head>

  <div
    id="myModal"
    class="modal fade"
    data-backdrop="static"
    data-keyboard="false"
  >
    <div class="modal-dialog modal-confirm">
      <div class="modal-content">
        <div class="modal-header justify-content-center">
          <div class="icon-box">
            <i class="material-icons">&#xe5ca;</i>
          </div>
        </div>
        <div class="modal-body text-center">
          <h4>Canceled</h4>
          <p>Your Order has been canceled successfully.</p>
          <button
            @click="getOrders"
            class="btn btn-success"
            data-dismiss="modal"
          >
            <span>Ok</span>
            <i class="material-icons">&#xE5C8;</i>
          </button>
        </div>
      </div>
    </div>
  </div>
  <div
    id="confirmation"
    class="modal fade"
    data-backdrop="static"
    data-keyboard="false"
  >
    <div class="modal-dialog modal-confirm">
      <div class="modal-content">
        <div class="modal-header justify-content-center">
          <div class="icon-box">
            <i class="material-icons">&#xe811;</i>
          </div>
        </div>
        <div class="modal-body text-center">
          <h4>Cancel Order</h4>
          <p>Are you sure you want to cancel this order?</p>
          <button
            @click="cancelOrder"
            class="btn btn-danger mr-3"
            data-dismiss="modal"
          >
            <span>Yes</span>
          </button>
          <button class="btn btn-secondary" data-dismiss="modal">
            <span>No</span>
          </button>
        </div>
      </div>
    </div>
  </div>

  <div class="page">
    <h1 class="pt-4">My Orders</h1>
    <form class="pt-1 date row">
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
            <th scope="row">
              {{ order.created_at
              }}<button
                @click="toggleProducts"
                :id="order.id"
                class="toggle-btn ml-1 btn btn-info"
              >
                +
              </button>
            </th>
            <td>{{ order.status }}</td>
            <td>{{ order.total.toLocaleString() }} EGP</td>
            <td>
              <button
                @click="confirm"
                :id="order.id"
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
    <p class="pt-3 pb-2 total">
      Total Amount: <span style="color:orange;">{{ getTotalPrice.toLocaleString() }}</span> EGP
    </p>
    <div class="menu-footer ">
      <ul class="pagination">
        <li><a type="button" @click="prev" class="prev"> Prev</a></li>
        <li style="color:black">|</li>
        <li><a type="button" @click="next" class="next">Next</a></li>
      </ul>
    </div>
    <div id="products" class="card m-4">
      <div class="flex-products mb-3">
        <div v-for="product in products" :value="product.id" class="m-auto wrapper">
          <div class="product-text">
            <h1 align="center">{{ product.name.slice(0, 18) }}</h1>
          </div>
          <div class="product-img">
            <img :src="product.image" />
          </div>
          <div class="product-info">
            <div class="product-price-btn">
              <p align="center">
                quantity: {{ product.quantity }}<br />{{ product.price }}EGP
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@200&display=swap");

.page {
  font-family: "Poppins", sans-serif;
  color: white;
  height: 70rem;
}
.page h1 {
  color: white;
}

.error {
  color: orange;
  font-size: 1rem;
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

.date {
  padding-right: 9rem;
  padding-top: 1rem;
}
.modal-confirm {
  color: #434e65;
  width: 525px;
}
.modal-confirm .modal-content {
  padding: 20px;
  font-size: 16px;
  border-radius: 5px;
  border: none;
}
.modal-confirm .modal-header {
  background: green;
  border-bottom: none;
  position: relative;
  text-align: center;
  margin: -20px -20px 0;
  border-radius: 5px 5px 0 0;
  padding: 35px;
}

#confirmation .modal-confirm .modal-header {
  background: #afbabc;
}

.modal-confirm h4 {
  text-align: center;
  font-size: 36px;
  margin: 10px 0;
}
.modal-confirm .form-control,
.modal-confirm .btn {
  min-height: 40px;
  border-radius: 3px;
}
.modal-confirm .close {
  position: absolute;
  top: 15px;
  right: 15px;
  color: #fff;
  text-shadow: none;
  opacity: 0.5;
}
.modal-confirm .close:hover {
  opacity: 0.8;
}
.modal-confirm .icon-box {
  color: #fff;
  width: 95px;
  height: 95px;
  display: inline-block;
  border-radius: 50%;
  z-index: 9;
  border: 5px solid #fff;
  padding: 15px;
  text-align: center;
}
.modal-confirm .icon-box i {
  font-size: 64px;
  margin: -4px 0 0 -4px;
}
.modal-confirm.modal-dialog {
  margin-top: 80px;
}
.modal-confirm .btn,
.modal-confirm .btn:active {
  color: #fff;
  border-radius: 4px;
  text-decoration: none;
  transition: all 0.4s;
  line-height: normal;
  border-radius: 30px;
  margin-top: 10px;
  padding: 6px 20px;
  border: none;
}
.modal-confirm .btn:hover,
.modal-confirm .btn:focus {
  outline: none;
}
.modal-confirm .btn span {
  margin: 1px 3px 0;
  float: left;
}
.modal-confirm .btn i {
  margin-left: 1px;
  font-size: 20px;
  float: right;
}
.trigger-btn {
  display: inline-block;
  margin: 100px auto;
}

.total {
  font-size: 1.5rem;
}
#products {
  display: none;
}

.card p {
  color: black;
}

.wrapper {
  height: 11.1rem;
  width: 7rem;
  border-radius: 5px;
  -webkit-box-shadow: 0px 14px 32px 0px rgba(0, 0, 0, 0.15);
  -moz-box-shadow: 0px 14px 32px 0px rgba(0, 0, 0, 0.15);
  box-shadow: 0px 14px 32px 0px rgba(0, 0, 0, 0.15);
}

.product-img {
  float: top;
}

.product-img img {
  border-radius: 7px 7px 7px 7px;
  height: 6rem;
  width: 7rem;
}

.product-info {
  float: left;
  height: 1.5rem;
  width: 7rem;
  border-radius: 7px;
  background-color: #ffffff;
}

.product-text {
  height: 2.5rem;
  width: 7rem;
  background-color: #fcfcfc;
}

.product-text h1 {
  font-size: 1.1rem;
  color: #474747;
}

.product-price-btn {
  height: 2rem;
  width: 100%;
  position: relative;
}

.product-price-btn p {
  display: inline-block;
  height: 7vh;
  font-size: 1rem;
}

.flex-products {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-content: flex-start;
  align-items: flex-start;
  padding-top: 1rem;
}
</style>

<script>
import Order from "../../apis/Order";
import User from "../../apis/User";
import $ from "jquery";
export default {
  data() {
    return {
      fromDate: "",
      toDate: "",
      error: "",
      orders: [],
      user_id: 0,
      products: [],
      page: 1,
      lastPage: 0,
      canceledOrder: -1,
    };
  },
  components: {},
  mounted() {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    this.fromDate = "2021-04-01";
    this.toDate = tomorrow.toJSON().slice(0, 10);
    User.auth().then((response) => {
      this.user_id = response.data.id;
      this.getOrders();
    });
  },
  methods: {
    toggleProducts($event) {
      const order = $event.currentTarget.id;
      const btnText = $event.currentTarget.innerText;
      $(".toggle-btn").text("+");
      if (btnText === "-") {
        $("#products").hide();
      } else {
        $(`#${order}`).text("-");
        $("#products").show();
        console.log(this.products);
        Order.getOrderProducts(order).then(
          (response) => (this.products = response.data.data)
        );
      }
    },
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
    cancelOrder() {
      console.log("HI");
      Order.cancelOrder(this.canceledOrder)
        .then((response) => {
          if (response.status === 200) $("#myModal").modal();
        })
        .catch(() => this.$router.push("/notfound"));
    },
    getOrders() {
      this.orders = Order.getUserOrders(
        this.page,
        this.user_id,
        this.fromDate,
        this.toDate
      ).then((response) => {
        this.orders = response.data.data;
        this.lastPage = response.data.meta.last_page;
      });
    },
    async next() {
      if (this.page === this.lastPage) return;
      this.page++;
      await this.getOrders();
    },
    async prev() {
      if (this.page === 1) return;
      this.page--;
      await this.getOrders();
    },
    confirm($event) {
      this.canceledOrder = $event.currentTarget.id;
      $("#confirmation").modal();
    },
  },
  computed: {
    getTotalPrice: function() {
      const orders_list = Object.values(this.orders);
      return orders_list.reduce((total, obj) => obj.total + total, 0);
    },
  },
};
</script>
