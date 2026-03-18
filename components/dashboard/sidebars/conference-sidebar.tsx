import DashboardSidebar from "../shared/dashboard-sidebar";
import { sidebarNavigation } from "@/constants/navigation";

export default function ConferenceSidebar() {
  return (
    <DashboardSidebar
      title="Conference Admin"
      items={sidebarNavigation.CONFERENCE_ADMIN}
    />
  );
}
