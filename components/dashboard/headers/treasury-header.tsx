import { AuthUser } from "@/types/user";
import DashboardHeader from "../shared/dashboard-header";

export default function TreasuryHeader({ user }: { user: AuthUser }) {
  return <DashboardHeader title="Treasury Dashboard" user={user} />;
}
