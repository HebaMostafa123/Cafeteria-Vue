<template>
  <b-container>
    <b-row>
      <b-col cols="12" sm="4" class="my-1" :key="index" v-for="(item, index) in paginatedItems">
        <b-card
          :bg-variant="item.variant"
          text-variant="white"
          :header="item.title"
          class="text-center"
        >
          <p class="card-text">{{item.body}}</p>
        </b-card>
      </b-col>
    </b-row>

    <b-row>
      <b-col md="6" class="my-1">
        <b-pagination
          @change="onPageChanged"
          :total-rows="totalRows"
          :per-page="perPage"
          v-model="currentPage"
          class="my-0"
        />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
const items = [
  {
    title: "Primary",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    variant: "primary"
  },
  {
    title: "Secondary",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    variant: "secondary"
  },
  {
    title: "Success",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    variant: "success"
  },
  {
    title: "Info",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    variant: "info"
  },
  {
    title: "Warning",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    variant: "warning"
  },
  {
    title: "Danger",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    variant: "danger"
  }
];

export default {
  name: "MyBootstrapGrid",
  data() {
    return {
      items: items,
      paginatedItems: items,
      currentPage: 1,
      perPage: 3,
      totalRows: items.length
    };
  },
  computed: {},
  methods: {
    paginate(page_size, page_number) {
      let itemsToParse = this.items;
      this.paginatedItems = itemsToParse.slice(
        page_number * page_size,
        (page_number + 1) * page_size
      );
    },
    onPageChanged(page) {
      this.paginate(this.perPage, page - 1);
    }
  },
  mounted() {
    this.paginate(this.perPage, 0);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
