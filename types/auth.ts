import { AuthUser } from "./user";

export interface LoginPayload {
  user: AuthUser;
  token: string;
}

export interface LoginResponse {
  success: boolean;
  data: LoginPayload;
  message?: string;
}
