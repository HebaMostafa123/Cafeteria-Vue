import hostUrl from "./hostUrl";
import axios from "axios";
const proudctsUrl = hostUrl + "product";
const token = JSON.parse(localStorage.getItem("user"));
export default {
  // getAllProudct: () => {
  //   return fetch(proudctsUrl, {
  //     method: "GET",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //       "Access-Control-Allow-Origin": "*",
  //       Authorization: "Bearer " + token["token"],
  //     },
  //   });
  // },



  // updateProudct: (id, proudct) => {
  //   return axios.patch(proudctsUrl + `/${id}`, proudct, {
  //     headers: {
  //       Authorization: "Bearer " + token["token"],
  //     },
  //   });
  // },

  deleteProduct: (id) => {
    return axios.delete(proudctsUrl + `/${id}`, {
      headers: {
        Authorization: "Bearer " + token["token"],
      },
    });
  },

  getProudctById: (id) => {
    return axios.get(proudctsUrl + `/${id}`, {
      headers: {
        Authorization: "Bearer " + token["token"],
      },
    });
  },

};
