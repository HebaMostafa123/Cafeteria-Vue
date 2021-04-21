import Api from './Api';

export default{
  sendOrder(order){
    return Api.post(`/orders`,order);
  }
}
