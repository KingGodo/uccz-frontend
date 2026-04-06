import { AuthUser } from "@/types/user";
import DashboardHeader from "../shared/dashboard-header";

export default function SundaySchoolHeader({ user }: { user: AuthUser }) {
  return <DashboardHeader title="Sunday School Dashboard" user={user} />;
}
