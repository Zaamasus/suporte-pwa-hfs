export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: 'user' | 'admin' | 'client' | 'technician';
  company?: string;
  specialties?: string[];
  is_online?: boolean;
  is_blocked?: boolean;
  created_at: string;
  updated_at: string;
}

export interface UserCreate {
  name: string;
  email: string;
  password: string;
  role?: 'user' | 'admin' | 'client' | 'technician';
  company?: string;
  specialties?: string[];
  is_blocked?: boolean;
} 