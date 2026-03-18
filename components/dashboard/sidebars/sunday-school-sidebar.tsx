import DashboardSidebar from "../shared/dashboard-sidebar";
import { sidebarNavigation } from "@/constants/navigation";

export default function SundaySchoolSidebar() {
  return (
    <DashboardSidebar
      title="Sunday School"
      items={sidebarNavigation.SUNDAY_SCHOOL_ADMIN}
    />
  );
}
