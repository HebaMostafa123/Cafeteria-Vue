<template>
  <body>
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
        />
      </div>
      <div>
        <p>{{ item.price }} EGP</p>
      </div>
      <div class="flex-item">
        <a class="delete btn btn-warning"><p>🗑️</p></a>
      </div>
    </div>
  </body>
</template>

<script>
export default {
  /* Child component registration */
  components: {},

  /* Properties */
  props: {
    item: Object,
  },

  /* Component's local data */
  data() {
    return {
      message: "Thinking in components",
    };
  },
  /* Watchers */
  watch: {},

  /* Computed properties */
  computed: {},

  /* Component methods */

  methods: {},

  created() {},
  mounted() {},
  updated() {},
  unmounted() {},
};
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@200&display=swap");
body {
  font-family: "Poppins", sans-serif;
}

.flex-container {
  width: 100%;
  display: flex;
  justify-content: space-between;
   align-items: baseline;
   padding-top:0.1rem;
   padding-right: 0.1rem;
}

.quantity {
  width: 3.7rem;
  height: 2rem;
}
.delete {
  width: 1.6rem;
  height: 1.6rem;
  text-align:center;
  margin-right:0.2rem;
}

.delete p{
  margin-left:-0.6rem;
    margin-top:-0.3rem;
}

.name{
  width:8rem;
  margin-left:0.3rem;
}

</style>
