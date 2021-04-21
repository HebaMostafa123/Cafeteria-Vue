import Api from './Api';


export default {
  register(form) {
    return Api.post("/register", form);
  },
  getRooms() {
    return Api.get('/rooms');
  },


}