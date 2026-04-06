import DashboardSidebar from "../shared/dashboard-sidebar";
import { sidebarNavigation } from "@/constants/navigation";

export default function RuwadzanoSidebar() {
  return (
    <DashboardSidebar
      title="Ruwadzano"
      items={sidebarNavigation.RUWADZANO_ADMIN}
    />
  );
}
