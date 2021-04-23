import Api from './Api';

export default{
  async searchDate(form){
    return Api.post("/orders/search", form);
  }
}