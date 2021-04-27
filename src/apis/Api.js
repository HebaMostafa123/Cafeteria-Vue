import axios from 'axios';
// Api.defaults.headers.common['Authorization'] = token ? token.access_token : '';

let Api = axios.create({
  baseURL: "http://localhost:8000/api",
});

Api.defaults.withCredentials = true;
Api.interceptors.request.use(function (config) {
  // Do something before request is sent
  const token = localStorage.getItem('token');
  console.log(config);
  if (token) {
      config.headers.common['Authorization'] = `Bearer ${token}`;
  }

  return config;
}, function (error) {
  // Do something with request eror
  return Promise.reject(error);
});




export default Api;
