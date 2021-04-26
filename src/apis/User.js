import Api from './Api';

export default{
  async register(form){
    return Api.post("/register", form);
  },
  async getRooms() {
    return Api.get('/rooms');
  },
  async login(form) {
    return Api.post('/login', form);
  },
  async logout() {
    return Api.post('logout');
  },
  async auth() {
    return Api.get("/user");
  },
  async getAllUsers(){
    return Api.get('/users');
  },
  async loginUserFacebook(){
    return Api.get('authorize/facebook/redirect');
  },
  async loginUserFacebookCallback(ctx){
    return Api.get('authorize/facebook/callback', {
      params: ctx
    });
  },
  async SendForgotPassword(form){
    return Api.post("/forgot-password", form);
  },
  async sendResetPassword(form){
    return Api.post("/reset-password", form);
  },
}