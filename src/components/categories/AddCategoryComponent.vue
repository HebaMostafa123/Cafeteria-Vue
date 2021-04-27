<template>

  <div class="container">
    <div class="row">
      <div class="col-9">
          <div class="form-group m-1">
            <input
                v-model="categoy"
                class="form-control"
                placeholder="Category Name"
                type="text"
            />
          </div>
      </div>
      <div class="col-2">
        <input type="Submit" @click="addCategory(categoy)" value="Add categoy" class="btn btn-success btn-sm form-group m-1" />
      </div>

    </div>
    <p class="errors">
          <span v-if="'number' in errors">
            {{ errors["number"][0]  }}
          </span>
    </p>

  </div>

</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    errors: Array,
    categoy: String
  },
  data(){
    return{
      // categoy:""
    }
  },
  methods:{
    addCategory(categoy){
      console.log("emmeting event")
      this.$emit("addCategory",categoy)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
