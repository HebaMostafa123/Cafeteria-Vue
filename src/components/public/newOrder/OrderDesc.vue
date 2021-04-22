<template>
  <body>
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
                  min="0"
                  value="0"
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
            <option value="" disabled selected hidden>Choose your room number</option>
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
export default {
  /* Child component registration */
  components: {},

  /* Properties */
  props: {
    product: Object,
    items: Array,
    userId: Number,
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
      return this.items.reduce((total, obj) => obj.price + total, 0);
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
        Order.sendOrder(request).then((response) => {
          console.log(response.request.status);
        });
      }
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
</style>
