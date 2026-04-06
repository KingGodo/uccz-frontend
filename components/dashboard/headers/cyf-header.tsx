import { AuthUser } from "@/types/user";
import DashboardHeader from "../shared/dashboard-header";

export default function CyfHeader({ user }: { user: AuthUser }) {
  return <DashboardHeader title="CYF Dashboard" user={user} />;
}
