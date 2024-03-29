import axios from 'axios'
import { getCookie, deleteCookie } from "cookies-next";

const domain = "http://localhost:9091/api/v1/";

const axiosInstance = axios.create({
  baseURL: domain,
});

axiosInstance.interceptors.request.use(function (config) {
  let user = getCookie('user')
  
  if (user) {
    user = JSON.parse(user)
    //config.headers.Authorization = `Bearer ${user.access_token}`
  }
  
  return config;
}, function (error) {
  return Promise.reject(error);
});

axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    if (error?.response?.status === 401) {
      deleteCookie('user') 
    }
    
    return Promise.reject(error);
  }
);

// eslint-disable-next-line import/no-anonymous-default-export
export default {domain, axiosInstance}