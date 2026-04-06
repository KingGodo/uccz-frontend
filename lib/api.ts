import axios from "axios";

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// 🔥 FULL DEBUG INTERCEPTOR
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("❌ FULL AXIOS ERROR:", error);

    if (error.response) {
      console.error("🔴 STATUS:", error.response.status);
      console.error("🔴 HEADERS:", error.response.headers);
      console.error("🔴 DATA:", error.response.data);
    } else if (error.request) {
      console.error("🟡 NO RESPONSE:", error.request);
    } else {
      console.error("⚪ SETUP ERROR:", error.message);
    }

    return Promise.reject(error);
  }
);