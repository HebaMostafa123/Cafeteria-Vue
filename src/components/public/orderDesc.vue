<template>
  <head>
    <link
      href="https://fonts.googleapis.com/css?family=Bentham|Playfair+Display|Raleway:400,500|Suranna|Trocchi"
      rel="stylesheet"
    />
  </head>
  <body>
    <div class="grid-container">
      <div class="items">
        dd
        <hr />
      </div>

      <div align="center" class="notes">
        <h5>Notes</h5>
        <textarea name="w3review" rows="4" cols="30"> </textarea>
        <hr />
        <label>Room number</label>
        <select class="form-control">
          <option selected>Choose your room number</option>
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
  </body>
</template>

<script>
import User from "../../apis/User";
export default {
  /* Child component registration */
  components: {},

  /* Properties */
  props: {
    product: Object,
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
  font-family: "Nunito Sans", sans-serif;
  background-color: #E7F1F9;
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
</style>
