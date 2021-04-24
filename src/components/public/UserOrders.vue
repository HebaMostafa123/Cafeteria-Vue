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
            <i class="material-icons">&#xe811;</i>
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
    <p class="total">Total Price: <span style="color:orange;">{{getTotalPrice}}</span> EGP</p>
            <div class="menu-footer ">
          <ul class="pagination">
            <li><a type="button" @click="prev" class="prev"> Prev</a></li>
            <li style="color:black">|</li>
            <li><a type="button" @click="next" class="next">Next</a></li>
          </ul>
        </div>
    <div class="card m-4">
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
  background: orange;
  border-bottom: none;
  position: relative;
  text-align: center;
  margin: -20px -20px 0;
  border-radius: 5px 5px 0 0;
  padding: 35px;
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
  background: #eeb711 !important;
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
  background: #eda645 !important;
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

.total{
    font-size:1.5rem;
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
    cancelOrder($event) {
      Order.cancelOrder($event.currentTarget.id)
        .then((response) => {
          if (response.status === 200) $("#myModal").modal();
        })
        .catch(() => this.$router.push("/notfound"));
    },
    getOrders() {
      this.orders = Order.getUserOrders(
        this.user_id,
        this.fromDate,
        this.toDate
      ).then((response) => {
        this.orders = response.data.data;
      });
    },
  },
  computed :{
    getTotalPrice: function() {
       const orders_list = Object.values(this.orders);
      return orders_list.reduce((total, obj) => obj.total + total, 0);
    },
  }
};
</script>
