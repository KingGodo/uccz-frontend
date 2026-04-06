import { useAuth } from "./useAuth";
import { UserRole } from "@/types/user";

export const useRole = () => {
  const { user } = useAuth();

  const hasRole = (roles: UserRole[]) => {
    if (!user) return false;
    return roles.includes(user.role);
  };

  return { user, hasRole };
};