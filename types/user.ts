export type UserRole =
  | "SUPER_ADMIN"
  | "CONFERENCE_ADMIN"
  | "REGION_ADMIN"
  | "PASTOR"
  | "CYF_ADMIN"
  | "RUWADZANO_ADMIN"
  | "SUNDAY_SCHOOL_ADMIN"
  | "TREASURY";

export interface AuthUser {
  id: number;
  email: string;
  role: UserRole;

  conference_id?: number;
  region_id?: number;
  church_id?: number;
}
