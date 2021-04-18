import Api from './Api';

export default{
  getCookie(){
    return Api.get('/csrf-cookie');
  }
}