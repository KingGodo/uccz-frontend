import DashboardSidebar from "../shared/dashboard-sidebar";
import { sidebarNavigation } from "@/constants/navigation";

export default function SuperAdminSidebar() {
  return (
    <DashboardSidebar
      title="Super Admin"
      items={sidebarNavigation.SUPER_ADMIN}
    />
  );
}
