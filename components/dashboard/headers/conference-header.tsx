import { AuthUser } from "@/types/user";
import DashboardHeader from "../shared/dashboard-header";

export default function ConferenceHeader({ user }: { user: AuthUser }) {
  return <DashboardHeader title="Conference Admin Dashboard" user={user} />;
}
