import axios from "axios";
import hostUrl from "./hostUrl";
const proudctsUrl = hostUrl + "product";
const token = JSON.parse(localStorage.getItem("user"));
export default {
  deleteProduct: (id) => {
    return axios.delete(proudctsUrl + `/${id}`, {
      headers: {
        Authorization: "Bearer " + token["token"],
      },
    });
  },
};
