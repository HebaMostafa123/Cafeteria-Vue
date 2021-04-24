import Api from "./Api";
export default {
  //admin page list proccessed orders
  async getProcessingOrders() {
    return Api.get("/orders");
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
  getUsers() {
    return Api.get(`/users`);
  },
};
