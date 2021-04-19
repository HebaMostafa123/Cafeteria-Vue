import Api from './Api';

export default{
  async register(form){
    return Api.post("/register", form); 
  },
  async getRooms(){
    return Api.get('/rooms');
  },
}