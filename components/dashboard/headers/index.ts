import { UserRole } from "@/types/user";
import { AuthUser } from "@/types/user";

import SuperAdminHeader from "./super-admin-header";
import ConferenceHeader from "./conference-header";
import RegionHeader from "./region-header";
import PastorHeader from "./pastor-header";
import CyfHeader from "./cyf-header";
import RuwadzanoHeader from "./ruwadzano-header";
import SundaySchoolHeader from "./sunday-school-header";
import TreasuryHeader from "./treasury-header";

// ✅ STATIC MAP
export const headerMap: Record<
  UserRole,
  React.ComponentType<{ user: AuthUser }>
> = {
  SUPER_ADMIN: SuperAdminHeader,
  CONFERENCE_ADMIN: ConferenceHeader,
  REGION_ADMIN: RegionHeader,
  PASTOR: PastorHeader,
  CYF_ADMIN: CyfHeader,
  RUWADZANO_ADMIN: RuwadzanoHeader,
  SUNDAY_SCHOOL_ADMIN: SundaySchoolHeader,
  TREASURY: TreasuryHeader,
};
