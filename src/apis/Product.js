import Api from "./Api";

export default {
  getProducts(page = 1) {
    return Api.get(`/products?page=${page}`);
  },

  async getCategories() {
    return Api.get("/categories");
  },

  async createProduct(product) {
    return Api.post("/products", product);
  },

  async updateProduct(id, product) {
    return Api.patch(`products/${id}`, product);
  },

  async getProduct(id) {
    return Api.get(`products/${id}`);
  },
  // async deleteProduct(id) {
  //   return Api.delete(`products/${id}`);
  // },
  deleteProduct(id, products) {
    let i = products.map((data) => data.id).indexOf(id);
    products.splice(i, 1);
    return Api.delete(`/products/${id}`);
  },
};
