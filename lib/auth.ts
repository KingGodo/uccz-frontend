import { api } from "./api";
import { AuthUser } from "@/types/user";
import { LoginResponse } from "@/types/auth";

export const storeToken = (token: string) => {
  if (typeof document === "undefined") return;

  const isHttps = typeof window !== "undefined" && window.location.protocol === "https:";
  const secure = isHttps ? "; Secure" : "";

  // Note: cannot set HttpOnly from client-side JS.
  document.cookie = `token=${encodeURIComponent(token)}; Path=/; SameSite=Lax${secure}`;
};

export const clearToken = () => {
  if (typeof document === "undefined") return;
  document.cookie = "token=; Path=/; Max-Age=0; SameSite=Lax";
};

// 🔐 LOGIN
export const login = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  const res = await api.post<LoginResponse>("/auth/login", {
    email,
    password,
  });

  return res.data;
};

// ✅ GET USER FROM LOCAL STORAGE
export const getStoredUser = (): AuthUser | null => {
  if (typeof window === "undefined") return null;

  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

// ✅ SAVE USER
export const storeUser = (user: AuthUser) => {
  localStorage.setItem("user", JSON.stringify(user));
};

// ✅ LOGOUT
export const logoutUser = () => {
  localStorage.removeItem("user");
  clearToken();
  window.location.href = "/login"; // force redirect
};

// ✅ GET CURRENT USER (for context)
export const getCurrentUser = async (): Promise<AuthUser | null> => {
  return getStoredUser(); // later replace with API call if needed
};