import { UserRole, AuthUser } from "@/types/user";

/* ================= ROLE → ROUTES ================= */

export const roleRoutes: Record<AuthUser["role"], string> = {
  SUPER_ADMIN: "/dashboard/super-admin",
  CONFERENCE_ADMIN: "/dashboard/conference-admin",
  REGION_ADMIN: "/dashboard/region-admin",
  PASTOR: "/dashboard/pastor",
  CYF_ADMIN: "/dashboard/cyf",
  RUWADZANO_ADMIN: "/dashboard/ruwadzano",
  SUNDAY_SCHOOL_ADMIN: "/dashboard/sunday-school",
  TREASURY: "/dashboard/treasury",
};

export function resolveRoleRoute(role: unknown): string | null {
  if (typeof role !== "string") return null;

  const normalized = role
    .trim()
    .toUpperCase()
    .replace(/[\s-]+/g, "_");

  if (normalized in roleRoutes) {
    return roleRoutes[normalized as keyof typeof roleRoutes];
  }

  return null;
}

/* ================= SIDEBAR ================= */

export interface NavItem {
  label: string;
  href: string;
}

export const sidebarNavigation: Record<UserRole, NavItem[]> = {
  SUPER_ADMIN: [
    { label: "Dashboard", href: "/dashboard/super-admin" },
    { label: "Users", href: "/dashboard/super-admin/users" },
    { label: "Conferences", href: "/dashboard/super-admin/conferences" },
    { label: "Regions", href: "/dashboard/super-admin/regions" },
    { label: "Churches", href: "/dashboard/super-admin/churches" },
    { label: "Members", href: "/dashboard/super-admin/members" },
  ],

  CONFERENCE_ADMIN: [
    { label: "Dashboard", href: "/dashboard/conference-admin" },
    { label: "Regions", href: "/dashboard/conference-admin/regions" },
    { label: "Churches", href: "/dashboard/conference-admin/churches" },
  ],

  REGION_ADMIN: [
    { label: "Dashboard", href: "/dashboard/region-admin" },
    { label: "Churches", href: "/dashboard/region-admin/churches" },
    { label: "Members", href: "/dashboard/region-admin/members" },
  ],

  PASTOR: [
    { label: "Dashboard", href: "/dashboard/pastor" },
    { label: "Members", href: "/dashboard/pastor/members" },
    { label: "Ministries", href: "/dashboard/pastor/ministries" },
  ],

  CYF_ADMIN: [
    { label: "Dashboard", href: "/dashboard/cyf" },
    { label: "Youth Members", href: "/dashboard/cyf/members" },
  ],

  RUWADZANO_ADMIN: [
    { label: "Dashboard", href: "/dashboard/ruwadzano" },
    { label: "Women Fellowship", href: "/dashboard/ruwadzano/members" },
    { label: "Men Fellowship", href: "/dashboard/ruwadzano/mens-fellowship" },
    { label: "Volunteers", href: "/dashboard/ruwadzano/volunteers" },
    { label: "Councils", href: "/dashboard/ruwadzano/councils" },
  ],

  SUNDAY_SCHOOL_ADMIN: [
    { label: "Dashboard", href: "/dashboard/sunday-school" },
    { label: "Children", href: "/dashboard/sunday-school/members" },
  ],

  TREASURY: [
    { label: "Dashboard", href: "/dashboard/treasury" },
    { label: "Finance", href: "/dashboard/treasury/finance" },
  ],
};
