<template>
  <div class="check container-fluid mt-2">
    <form @submit.prevent @submit="search">
      <div class="form-row">
        <div class="form-group col-md-4">
          <label for="dateFrom">Date From</label>
          <input
            type="date"
            class="form-control"
            id="dateFrom"
            placeholder="Date From"
            v-model="form.date_from"
            required
          />
        </div>
        <div class="form-group col-md-4">
          <label for="dateTo">Date To</label>
          <input
            type="date"
            class="form-control"
            id="dateTO"
            required
            v-model="form.date_to"
          />
        </div>
        <div class="form-group col-md-4">
          <label for="user">User</label>
          <div class="d-flex">
            <select
              id="user"
              class="form-control"
              v-model="form.selected_user_id"
              required
            >
              <option>All users</option>
              <option v-for="oneUser in users" :value="oneUser.id">{{
                oneUser.name
              }}</option>
            </select>
            <button type="submit" class="btn btn-info ml-2">
              Search
            </button>
          </div>
        </div>
        <p style="color:orange;margin:auto;">{{ error }}</p>
      </div>
    </form>
    <NamePricesCheck :usersPrices="usersPrices" :form="form" />
  </div>
</template>

<script>
import Csrf from "../../apis/Csrf";
import Check from "../../apis/Check";
import User from "../../apis/User";
import NamePricesCheck from "./NamePricesCheck.vue";
export default {
  data() {
    return {
      form: {
        date_from: "",
        date_to: "",
        selected_user_id: "",
      },
      users: [],
      loggedUser: "",
      usersPrices: [],
      error: "",
    };
  },
  mounted() {
    User.getAllUsers().then((response) => {
      this.users = response.data;
    });
    User.auth()
      .then((response) => {
        this.loggedUser = response.data;
      })
      .then(() => {
        const filteredUsers = this.users.data.filter(
          (oneUser) => oneUser.id !== this.loggedUser.id
        );
        this.users = filteredUsers;
      });
  },
  components: {
    NamePricesCheck,
  },
  methods: {
    search() {
      this.error = "";
      Csrf.getCookie().then(() => {
        if (this.form.date_to < this.form.date_from) {
          this.error = "Invalid time frame";
        } else {
          Check.searchUsersDate(this.form).then((response) => {
            if (response.data.length === undefined) {
              this.usersPrices = [];
              this.usersPrices.push(response.data);
            } else {
              this.usersPrices = response.data;
            }
          });
        }
      });
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@200&display=swap");

* {
  font-family: "Poppins", sans-serif;
}

label {
  color: white;
}

form {
  margin-top: 3rem;
}

.check {
  height: 80rem;
}
</style>
