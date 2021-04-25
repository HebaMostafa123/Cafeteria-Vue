<template>
  <div class="container border" v-if="isProductsExist() && isEnabled">
    <h4 class="p-3 font-weight-bold">Products</h4>
        <div class="container-fluid px-5 py-5 mx-auto">
    <div class="row px-4">
        <div class="text-center col-3" v-for="product in products" >
            <p class="my-3 prod-name font-weight-bold">{{product.name}}</p> 
            <img class="image" :src="product.image"/>
            <div class="price text-center pt-3">
                <h6 class="h6">L.E {{product.price}}</h6>
            </div>
            <p class="my-3 prod-name">{{product.quantity}}</p> 
        </div>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return({
        isEnabled: true
    })
  },

  props:{
    products: Object,
    userExpandedPage: Number,
    orderExpandedPage: Number
  },
  watch: { 
    userExpandedPage(){
        this.isEnabled = false;
    },
    orderExpandedPage(){
        this.isEnabled = true;
    }
  },
  methods:{
    isProductsExist(){
      if (this.products.length > 0)return true
      return false
    }
  }
}
</script>

<style scoped>
body {
    color: #000;
    overflow-x: hidden;
    height: 100%;
    background-color: #FFFF00;
    background-repeat: no-repeat
}

.bread-crumb {
    cursor: pointer
}

.bread-crumb:hover {
    text-decoration: underline
}

.block {
    position: relative;
    background-color: #fff;
    width: 24%;
    height: 300px;
    border: 2px solid #E0E0E0;
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.2);
    cursor: pointer;
    margin-bottom: 25px
}

.block.active {
    border: 2px solid #FBC02D;
    box-shadow: 0 4px 8px 0 #FBC02D
}

.price {
    position: absolute;
    background-color: #E0E0E0;
    padding: 25px 10px;
    top: 20%;
    left: 60%;
    border-radius: 50%;
    width: 40%;
    height: 20%;
}

.price.active {
    background-color: #FBC02D;
    box-shadow: 0 3px 6px 0 #FBC02D
}

.image {
    width: 50%;
    height: 50%;
}

.prod-name {
    font-size: 20px
}

@media screen and (max-width: 992px) {
    .block {
        width: 48%
    }
}

@media screen and (max-width: 768px) {
    .block {
        width: 98%
    }
}
</style>

