import Api from "./Api";

export default {
  async register(form) {
    return Api.post("/register", form);
  },
  async getRooms() {
    return Api.get("/rooms");
  },
  async login(form) {
    return Api.post("/login", form);
  },
  async logout() {
    return Api.post("logout");
  },
  async auth() {
    return Api.get("/user");
  },
  //admin page list proccessed orders
  async getOrder() {
    return Api.get("/orders", Orders);
  },
  async getAllUsers() {
    return Api.get("/users");
  },
};
