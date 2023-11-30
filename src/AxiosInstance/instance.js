import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://newspaper-server-side-lemon.vercel.app",
});

export default axiosInstance;
