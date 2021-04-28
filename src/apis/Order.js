import Api from "./Api";
export default {
  async getProcessingOrders(page = 1) {
    return Api.get(`/orders?page=${page}`);
  },
  async changeStatus(id, router) {
    Api.patch(`/orders/${id}`);
  },
  sendOrder(order) {
    return Api.post(`/orders`, order);
  },
  getLatestOrder(user_id) {
    return Api.get(`/orders/latest_order/${user_id}`);
  },
  getUsernames(){
    return Api.get(`/usernames`);
  },
  getUserOrders(page = 1,user_id,from,to){
    return Api.get(`/orders/user/${user_id}?page=${page}&from=${from}&to=${to}`);
  },
  cancelOrder(id){
    return Api.delete(`/orders/${id}`);
  },
  getOrderProducts(id){
    return Api.get(`/orders/products/${id}`);
  },
  getUsers() {
    return Api.get(`/users`);
  },
};
