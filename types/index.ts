// ================= USER / AUTH =================

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

  // optional hierarchy
  conference_id?: number;
  region_id?: number;
  church_id?: number;
}

// ================= CORE ENTITIES =================

export interface Conference {
  id: number;
  name: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Region {
  id: number;
  conference_id: number;
  name: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Church {
  id: number;
  region_id: number;
  name: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Ministry {
  id: number;
  name: string;
  description?: string;
}

// ================= MEMBER =================

export interface MemberFormData {
  church_id: number;
  first_name: string;
  last_name: string;
  sex?: string;

  has_relative_in_uccz: boolean;

  // 🔥 relationships
  ministries: number[];
}
