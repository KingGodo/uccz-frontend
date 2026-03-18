import DashboardSidebar from "../shared/dashboard-sidebar";
import { sidebarNavigation } from "@/constants/navigation";

export default function CyfSidebar() {
  return (
    <DashboardSidebar
      title="CYF"
      items={sidebarNavigation.CYF_ADMIN}
    />
  );
}
