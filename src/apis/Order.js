import Api from "./Api";

export default {
  //admin page list proccessed orders
  async getProcessingOrders() {
    return Api.get("/orders");
  },
};
