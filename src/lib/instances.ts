import axios, { AxiosInstance } from "axios";
import { getRecoilToken } from "./getRecoilToken";
import toast from "react-hot-toast";
const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getRecoilToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Handle request error here
    return Promise.reject(error);
  },
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Any custom response handling can be done here
    if (response.status === 201 && response?.data?.errors[0]?.message) {
      toast.error(response?.data?.errors[0]?.message);
    }
    return response;
  },
  (error) => {
    // Handle response error here
    if (error.response?.status === 201) {
      // Example: redirect to login if unauthorized
      alert("Bad request 201 !!");
    }
    if (error.response?.status === 400) {
      // Example: redirect to login if unauthorized
      alert("Bad request 400 !!");
    }
    if (error.response?.status === 500) {
      // Example: redirect to login if unauthorized
      alert("Something went wrong !!!");
    }
    if (error.response?.status === 406) {
      // Example: redirect to login if unauthorized
      alert("User authentication failed!!");
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
