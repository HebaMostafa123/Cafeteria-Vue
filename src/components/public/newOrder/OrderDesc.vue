<template>
  <body>
    <form>
      <div class="grid-container">
        <div class="items flex-items">
          <orderItem
            class="card"
            v-for="item in items"
            v-bind:item="item"
          ></orderItem>
        </div>
        <div align="center" class="notes">
          <h5>Notes</h5>
          <textarea
            style="resize: none;"
            name="w3review"
            rows="4"
            cols="20"
          ></textarea>
          <hr />
          <label>Room number</label>
          <select class="form-control" required>
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
          <p>Price : EGP</p>
          <button class="btn btn-info">Send Order</button>
        </div>
      </div>
    </form>
  </body>
</template>

<script>
import User from "../../../apis/User";
import OrderDesc from "./OrderDesc.vue";
import OrderItem from "./OrderItem.vue";
export default {
  /* Child component registration */
  components: {
    OrderItem,
  },

  /* Properties */
  props: {
    product: Object,
    items: Array,
  },

  /* Component's local data */
  data() {
    return {
      message: "Thinking in components",
      rooms: [],
    };
  },
  /* Watchers */
  watch: {},

  /* Computed properties */
  computed: {},

  /* Component methods */

  methods: {},

  created() {},
  mounted() {
    User.getRooms().then((response) => {
      this.rooms = response.data;
      console.log(this.rooms);
    });
  },
  updated() {},
  unmounted() {},
};
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@200&display=swap");
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
  padding:0.3rem;
}

.card {
  width: 100%;
  height:2.3rem;
  background-color:white;
  margin-top:0.1rem;
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
</style>
