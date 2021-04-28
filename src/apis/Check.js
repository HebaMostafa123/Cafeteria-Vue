import Api from './Api';

export default{
  async searchUsersDate(form){
    return Api.post("/orders/search-users", form);
  },
  async searchUsersOrders(user_id, dateFrom, dateTo){
    return Api.get(`/orders/search-orders/${user_id}?dateFrom=${dateFrom}&dateTo=${dateTo}`);
  },
  async getOrderProducts(orderId){
    return Api.get(`/orders/${orderId}/products`);
  }
}