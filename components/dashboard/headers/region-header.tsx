import { AuthUser } from "@/types/user";
import DashboardHeader from "../shared/dashboard-header";

export default function RegionHeader({ user }: { user: AuthUser }) {
  return <DashboardHeader title="Region Admin Dashboard" user={user} />;
}
