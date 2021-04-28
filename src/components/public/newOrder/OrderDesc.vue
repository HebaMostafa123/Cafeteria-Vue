<template>
  <body>
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
              <i class="material-icons">&#xE876;</i>
            </div>
          </div>
          <div class="modal-body text-center">
            <h4>Great!</h4>
            <p>Your Order has been created successfully.</p>
            <button
              @click="trackOrder"
              class="btn btn-success"
              data-dismiss="modal"
            >
              <span>Track Your Order</span>
              <i class="material-icons">&#xE5C8;</i>
            </button>
          </div>
        </div>
      </div>
    </div>

    <form @submit.prevent @submit="submitOrder">
      <h4 align="center">Your Order</h4>
      <div class="grid-container">
        <div class="items flex-items">
          <div class="card" v-for="item in items">
            <div class="flex-container">
              <div class="flex-item name">
                <p>{{ item.name.slice(0, 18) }}</p>
              </div>
              <div class="flex-item">
                <input
                  class=" quantity form-control"
                  type="number"
                  max="20"
                  min="1"
                  value="1"
                  :id="item.id"
                  @change="changeQuantity($event)"
                />
              </div>
              <div>
                <p>{{ item.price }} EGP</p>
              </div>
              <div class="flex-item">
                <a
                  @click="removeItem($event)"
                  :id="item.id"
                  class="delete btn btn-warning"
                  ><p>🗑️</p></a
                >
              </div>
            </div>
          </div>
        </div>
        <div align="center" class="notes">
          <hr style="margin-top:0;" />
          <h5>Notes</h5>
          <textarea
            style="resize: none;"
            name="w3review"
            rows="4"
            cols="20"
            @change="changeNotes($event)"
          ></textarea>
          <hr />
          <label>Room number</label>
          <select @change="setRoomId($event)" class="form-control" required>
            <option value="" disabled selected hidden
              >Choose your room number</option
            >
            <option v-for="room in rooms" :value="room.id">
              {{ room.number }}
            </option>
          </select>
          <hr />
        </div>
        <div class="footer" align="center">
          <p>Price : {{ getTotalPrice }} EGP</p>
          <button @click="sumbitOrder" class="btn btn-info">Send Order</button>
          <p style="color:green;margin-top:1rem;">{{ error }}</p>
          <p></p>
        </div>
      </div>
    </form>
  </body>
</template>

<script>
import User from "../../../apis/User";
import OrderDesc from "./OrderDesc.vue";
import Order from "../../../apis/Order";
import $ from "jquery";
export default {
  /* Child component registration */
  components: {},

  /* Properties */
  props: {
    product: Object,
    items: Array,
    userId: Number,
    admin: Boolean,
  },

  /* Component's local data */
  data() {
    return {
      message: "Thinking in components",
      rooms: [],
      room_id: 0,
      notes: "",
      error: "",
    };
  },
  /* Watchers */
  watch: {},

  /* Computed properties */
  computed: {
    getTotalPrice: function() {
      return this.items.reduce(
        (total, obj) => obj.price * obj.quantity + total,
        0
      );
    },
  },

  /* Component methods */
  methods: {
    removeItem(event) {
      this.$emit("removeProduct", event.currentTarget.id);
    },
    changeQuantity(event) {
      const index = this.items
        .map((item) => item.id)
        .indexOf(+event.currentTarget.id);
      this.items[index].quantity = event.currentTarget.value;
    },
    changeNotes(event) {
      this.notes = event.currentTarget.value;
    },
    setRoomId(event) {
      this.room_id = event.currentTarget.value;
    },
    submitOrder() {
      if (this.items.length === 0) {
        this.error = "Please add items to your order";
      } else if (this.userId === -1) {
        this.error = "Please assign the order to a user";
      } else {
        this.items.forEach((v) => {
          v.product_id = v.id;
          delete v.image;
          delete v.price;
          delete v.name;
          delete v.id;
        });
        const request = {
          order: {
            user_id: this.userId,
            room_id: this.room_id,
            notes: this.notes,
          },
          products: this.items,
        };
        Order.sendOrder(request)
          .then((response) => {
            if (response.status === 200) $("#myModal").modal();
          })
          .catch(() => this.$router.push("/notfound"));
      }
    },
    trackOrder() {
      if (this.admin) this.$router.push("/adminorders");
      else this.$router.push("/orders");
    },
  },
  created() {},
  mounted() {
    User.getRooms().then((response) => {
      this.rooms = response.data;
    });
  },
  updated() {},
  unmounted() {},
};
</script>
<style scoped>
body {
  font-family: "Poppins", sans-serif;
  background-color: #e7f1f9;
}
.grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1.5fr 1.1fr 0.4fr;
  gap: 0px 0px;
  grid-template-areas:
    "items items"
    "notes notes"
    "footer footer";
}

.items {
  grid-area: items;
}

.notes {
  grid-area: notes;
}

.footer {
  grid-area: footer;
}

.flex-items {
  width: 100%;
  height: 25rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-content: flex-start;
  overflow: scroll;
  overflow-x: hidden;
  padding: 0.3rem;
  margin-left: 0.5rem;
  margin-top: 0.3rem;
}

.card {
  width: 100%;
  height: 2.3rem;
  background-color: white;
  margin-top: 0.1rem;
}
/* custom scrollbar */
::-webkit-scrollbar {
  width: 20px;
}

::-webkit-scrollbar-track {
  background-color: transparent;
}

::-webkit-scrollbar-thumb {
  background-color: #d6dee1;
  border-radius: 20px;
  border: 6px solid transparent;
  background-clip: content-box;
}

::-webkit-scrollbar-thumb:hover {
  background-color: #a8bbbf;
}
.flex-container {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding-top: 0.1rem;
  padding-right: 0.1rem;
}

.quantity {
  width: 3.7rem;
  height: 2rem;
}
.delete {
  width: 1.6rem;
  height: 1.6rem;
  text-align: center;
  margin-right: 0.2rem;
}

.delete p {
  margin-left: -0.6rem;
  margin-top: -0.3rem;
}

.name {
  width: 10rem;
  margin-left: 0.3rem;
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
  background: #47c9a2;
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
</style>
