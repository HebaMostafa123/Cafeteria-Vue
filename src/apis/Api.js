import axios from "axios";
let Api = axios.create({
  baseURL: "http://localhost:8000/api",
});

Api.defaults.withCredentials = true;
Api.defaults.headers["Authorization"] = `Bearer ${localStorage.getItem(
  "token"
)}`;

export default Api;
