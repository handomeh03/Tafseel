import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";

// ====================== Axios Instance ======================
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
  },
});

// ====================== Request Interceptor ======================
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const excludedEndpoints = [
      "/auth/login",
      "/store/request"
    ];

    const isExcluded = config.url
      ? excludedEndpoints.some((endpoint) => config.url?.includes(endpoint))
      : false;

    if (isExcluded) {
      return config;
    }


    if (typeof window !== "undefined") {
      const accessToken = localStorage.getItem("accessToken");

      if (accessToken && config.headers) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;