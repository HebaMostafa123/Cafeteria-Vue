import Api from './Api';

export default{
  sendOrder(order){
    return Api.post(`/orders`,order);
  },
  getLatestOrder(user_id){
    return Api.get(`/orders/latest_order/${user_id}`);
  },
  getUsers(){
    return Api.get(`/usernames`);
  },
  getUserOrders(user_id,from,to){
    return Api.get(`/orders/user/${user_id}?from=${from}&to=${to}`);
  }
}
