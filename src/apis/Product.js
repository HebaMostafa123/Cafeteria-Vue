import Api from './Api';

export default{
  getProducts(page = 1){
    return Api.get(`/products?page=${page}`);
  },

  async getCategories(){
    return Api.get("/categories");
  },

  async createProduct(product){
    return Api.post("/products",product);
  },

  async updateProduct(id, product){
    return Api.patch(`products/${id}`, product);
  },

  async getProduct(id){
    return Api.get(`products/${id}`);
  }
}

