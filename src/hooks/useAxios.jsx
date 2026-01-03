import axios from "axios";

export const axiosPublic = axios.create({
  baseURL: "http://localhost:5000",
});

export const axiosSecure = axios.create({
  baseURL: "http://localhost:5000",
});

axiosSecure.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access-token");
    if (token) {
      config.headers.authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosSecure.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const status = error.response?.status;
    if (status === 401 || status === 403) {
      // Handle logout or redirect if needed
    }
    return Promise.reject(error);
  }
);
