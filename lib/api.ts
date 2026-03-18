import axios from "axios";

export interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export const api = axios.create({
  baseURL: "http://127.0.0.1:5000/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error("API Response Error:", error.response.data);
    } else if (error.request) {
      console.error("API No Response (Network Error):", error.request);
    } else {
      console.error("API Setup Error:", error.message);
    }
    return Promise.reject(error);
  }
);
