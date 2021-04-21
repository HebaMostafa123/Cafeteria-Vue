<template>
  <body>
      <div class="flex-item">
        <p>{{ item.name }}</p>
        <p>{{ item.price }} EGP</p>
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

.flex-item{
  width: 100%;
  display: flex;
  align-items: flex-start;
  align-content: flex-start;
}
</style>
