import { AuthUser } from "@/types/user";
import DashboardHeader from "../shared/dashboard-header";

export default function SuperAdminHeader({ user }: { user: AuthUser }) {
  return <DashboardHeader title="Super Admin Dashboard" user={user} />;
}
