import config from "@/api/config";
import { deleteCookie, setCookie } from "cookies-next";

export async function register(email: string, password: string) {
  return config.axiosInstance.post('auth/register', JSON.stringify({
    "email": email,
    "password": password
  })).then((response) => {
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