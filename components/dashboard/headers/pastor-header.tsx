import { AuthUser } from "@/types/user";
import DashboardHeader from "../shared/dashboard-header";

export default function PastorHeader({ user }: { user: AuthUser }) {
  return <DashboardHeader title="Pastor Dashboard" user={user} />;
}
