
import config from "@/api/config";
import { deleteCookie, setCookie } from "cookies-next";

export async function login(email: string, password: string) {
  return config.axiosInstance.post('auth/login', JSON.stringify({
    "email": email,
    "password": password
  })).then((response) => {
    setCookie('user', JSON.stringify(response.data.result), {
      maxAge: response.data.result.expires_in,
      path: '/',
    });
    
    return response.data;
  })
  .catch((error) => {
    return null;
  });
}

export async function logout() {
  deleteCookie('user');
  return true;
}