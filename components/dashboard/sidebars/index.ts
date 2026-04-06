import { UserRole } from "@/types/user";

import SuperAdminSidebar from "./super-admin-sidebar";
import ConferenceSidebar from "./conference-sidebar";
import RegionSidebar from "./region-sidebar";
import PastorSidebar from "./pastor-sidebar";
import CyfSidebar from "./cyf-sidebar";
import RuwadzanoSidebar from "./ruwadzano-sidebar";
import SundaySchoolSidebar from "./sunday-school-sidebar";
import TreasurySidebar from "./treasury-sidebar";

// ✅ STATIC MAP (IMPORTANT)
export const sidebarMap: Record<UserRole, React.ComponentType> = {
  SUPER_ADMIN: SuperAdminSidebar,
  CONFERENCE_ADMIN: ConferenceSidebar,
  REGION_ADMIN: RegionSidebar,
  PASTOR: PastorSidebar,
  CYF_ADMIN: CyfSidebar,
  RUWADZANO_ADMIN: RuwadzanoSidebar,
  SUNDAY_SCHOOL_ADMIN: SundaySchoolSidebar,
  TREASURY: TreasurySidebar,
};
