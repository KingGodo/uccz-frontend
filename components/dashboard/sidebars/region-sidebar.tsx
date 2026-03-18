import DashboardSidebar from "../shared/dashboard-sidebar";
import { sidebarNavigation } from "@/constants/navigation";

export default function RegionSidebar() {
  return (
    <DashboardSidebar
      title="Region Admin"
      items={sidebarNavigation.REGION_ADMIN}
    />
  );
}
