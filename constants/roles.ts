// ✅ THIS MUST EXIST — otherwise TS says “not a module”

export type UserRole =
  | "SUPER_ADMIN"
  | "CONFERENCE_ADMIN"
  | "REGION_ADMIN"
  | "PASTOR"
  | "CYF_ADMIN"
  | "RUWADZANO_ADMIN"
  | "SUNDAY_SCHOOL_ADMIN"
  | "TREASURY";

export const ROLES: UserRole[] = [
  "SUPER_ADMIN",
  "CONFERENCE_ADMIN",
  "REGION_ADMIN",
  "PASTOR",
  "CYF_ADMIN",
  "RUWADZANO_ADMIN",
  "SUNDAY_SCHOOL_ADMIN",
  "TREASURY",
];