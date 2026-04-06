import { AuthUser } from "@/types/user";
import DashboardHeader from "../shared/dashboard-header";

export default function RuwadzanoHeader({ user }: { user: AuthUser }) {
  return <DashboardHeader title="Ruwadzano Dashboard" user={user} />;
}
