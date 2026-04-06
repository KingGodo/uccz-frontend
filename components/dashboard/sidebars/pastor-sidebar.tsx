import DashboardSidebar from "../shared/dashboard-sidebar";
import { sidebarNavigation } from "@/constants/navigation";

export default function PastorSidebar() {
  return (
    <DashboardSidebar
      title="Pastor"
      items={sidebarNavigation.PASTOR}
    />
  );
}
