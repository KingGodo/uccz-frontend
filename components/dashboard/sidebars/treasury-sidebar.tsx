import DashboardSidebar from "../shared/dashboard-sidebar";
import { sidebarNavigation } from "@/constants/navigation";

export default function TreasurySidebar() {
  return (
    <DashboardSidebar
      title="Treasury"
      items={sidebarNavigation.TREASURY}
    />
  );
}
