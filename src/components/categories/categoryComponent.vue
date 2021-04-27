<template>
  <AddCategoryComponent
    v-bind:errors="addCategoryErrors"
    v-bind:category="category"
    @addCategory="addCategory"
  ></AddCategoryComponent>
  <table class="table table-borderd">
    <thead>
      <tr>
        <th>category name</th>
        <th colspan="1">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="category in categories" :key="category.id" :value="category.id">
        <td>{{ category.label }}</td>
        <td>
          <button class="btn btn-link" @click="deleteCategory(category.id)">
            delete
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script>
import services from "../services/category.js";
import AddCategoryComponent from "@/components/categories/AddCategoryComponent";
import categoryServices from "@/components/services/category";
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      categories: [],
      category: "",
      addCategoryErrors: [],
    };
  },
  methods: {
    getAllCategories() {
      categoryServices.getAllCategories().then((json) => {
        console.log(json.data);
        this.categories = json.data;
      });
    },
    async addCategory(category) {
      this.addCategoryErrors = [];
      services
        .createCategory(category)
        .then((json) => {
          if (json.data.status == "success") {
            this.getAllCategories();
          } else {
          }
        })
        .catch((err) => {
          this.addCategoryErrors = err.response.data.message;
        });
    },
    async deleteCategory(id) {
      const res = await services.deleteCategory(id);
      if (res.data.status == "success") {
        this.getAllCategories();
      }
    },
  },
  created() {
    this.getAllCategories();
  },
  components: {
    AddCategoryComponent,
  },
};
</script>
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
