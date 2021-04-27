import hostUrl from "./hostUrl";
import axios from "axios";
const categoryUrl = hostUrl + "category";
const token = JSON.parse(localStorage.getItem("user"));
export default {
  getAllCategories: () => {
    return  axios.get(categoryUrl,{
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  },
  createCategory: (category) => {
    return axios.post(categoryUrl, {name:category}, {
      headers: {
        Authorization: "Bearer " + token["token"],
        Accept: "application/json"
      },
    });
  },
  
  deleteCategory: (id) => {
    return axios.delete(categoryUrl+`/${id}`, {
      headers: {
        Authorization: "Bearer " + token["token"],
        Accept: "application/json"
      },
    });
  },


}
