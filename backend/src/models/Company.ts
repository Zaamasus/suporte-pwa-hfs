export interface Company {
  id: string;
  name: string;
  color?: string;
  created_at: string;
  updated_at: string;
}

export interface CompanyCreate {
  name: string;
  color?: string;
}

export interface CompanyUpdate {
  name?: string;
  color?: string;
} 