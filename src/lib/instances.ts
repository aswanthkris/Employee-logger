import axios, { AxiosInstance } from "axios";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Add authorization token or any other custom headers if needed
    const token = "sampleToken"; // Or use cookies/session storage
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
    return response;
  },
  (error) => {
    // Handle response error here
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
