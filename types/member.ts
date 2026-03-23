export interface Conference {
  id: number;
  name: string;
}

export interface Region {
  id: number;
  name: string;
  conference_id: number;
}

export interface Church {
  id: number;
  name: string;
  region_id: number;
}

export interface Ministry {
  id: number;
  name: string;
}

export interface MemberFormData {
  church_id: number;

  prefix?: string;
  first_name: string;
  second_name?: string;
  last_name: string;

  sex?: string;
  date_of_birth?: string;

  active_status?: string;
  date_joined_uccz?: string;

  // 🔥 NEW FIELDS
  email?: string;
  phone?: string;

  has_relative_in_uccz: boolean;

  ministries: number[];
}
