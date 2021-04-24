import Api from './Api';

export default{
  getProducts(page = 1){
    return Api.get(`/products?page=${page}`);
  }
}