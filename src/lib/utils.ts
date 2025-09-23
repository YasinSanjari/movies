import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;
const accessToken = import.meta.env.VITE_ACCESS_TOKEN;
export const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${ accessToken }`
  }
});
