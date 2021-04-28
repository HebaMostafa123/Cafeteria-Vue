<template>
  <div class="contianer-fluid mt-4" v-if="isDataExist()">
    <hr />
    <h3 class="mt-3">Users</h3>
    <table
      class="table table-bordered border-5 table-striped mt-2 text-center"
      style="background-color:white"
    >
      <thead>
        <th>Name</th>
        <th>Total amount</th>
      </thead>
      <tbody>
        <tr v-for="userPrice in usersPrices" :key="userPrice.id">
          <td>
            <div class="d-flex">
              <div class="col-1">
                <input
                  type="submit"
                  class="inputUserBtn"
                  :id="userPrice.id + '.user'"
                  @click.prevent="
                    getOrders(
                      userPrice.id,
                      form.date_from,
                      form.date_to,
                      $event
                    )
                  "
                  value="+"
                />
              </div>
              <div class="col-10">
                {{ userPrice.user }}
              </div>
            </div>
          </td>
          <td>{{ userPrice.total_orders_price }}</td>
        </tr>
      </tbody>
    </table>
    <OrderPricesCheck :orders="orders" :userExpandedPage="userExpandedPage" />
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
import Csrf from "../../apis/Csrf";
import Check from "../../apis/Check";
import OrderPricesCheck from "./OrderPricesCheck.vue";
export default {
  data() {
    return {
      userExpandedPage: "",
      orders: [],
    };
  },
  props: {
    usersPrices: Object,
    form: Object,
  },
  components: {
    OrderPricesCheck,
  },
  methods: {
    isDataExist() {
      if (this.usersPrices.length > 0) return true;
      return false;
    },
    getOrders(user_id, dateFrom, dateTo) {
      const clickedBtn = document.getElementById(user_id + ".user");
      const allBtns = document.getElementsByClassName("inputUserBtn");
      if (user_id === this.userExpandedPage) {
        clickedBtn.value = "+";
        this.orders = [];
        this.userExpandedPage = "";
      } else {
        for (let btn of allBtns) {
          btn.value = "+";
        }
        clickedBtn.value = "-";
        Csrf.getCookie().then(() => {
          Check.searchUsersOrders(user_id, dateFrom, dateTo).then(
            (response) => {
              this.orders = response.data.data;
            }
          );
        });
        this.userExpandedPage = user_id;
      }
    },
    changeBtnValue() {},
  },
};
</script>

<style scoped>
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
h3 {
  color: orange;
}
</style>
