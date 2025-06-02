/**
 * Tipos para o sistema de suporte técnico
 */

// Usuário
export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: UserRole;
  companyId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum UserRole {
  ADMIN = 'admin',
  COMPANY = 'company',
  TECHNICIAN = 'technician'
}

// Empresa
export interface Company {
  id: string;
  name: string;
  cnpj?: string;
  address?: string;
  phone?: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

// Ticket de suporte
export interface Ticket {
  id: string;
  title: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  companyId: string;
  technicianId?: string;
  createdBy: string;
  closedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export enum TicketStatus {
  OPEN = 'open',           // Em aberto
  IN_PROGRESS = 'in_progress', // Em andamento
  PAUSED = 'paused',       // Em pausa
  CLOSED = 'closed'        // Finalizado
}

export enum TicketPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical'
}

// Comentário em ticket
export interface TicketComment {
  id: string;
  ticketId: string;
  userId: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

// Técnico
export interface Technician {
  id: string;
  userId: string;
  specialties?: string[];
  available: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Payload do JWT
export interface JwtPayload {
  userId: string;
  email: string;
  role: UserRole;
  companyId?: string;
}

// Requisição com usuário autenticado
export interface AuthRequest extends Express.Request {
  user?: JwtPayload;
}

// Resposta para autenticação
export interface AuthResponse {
  user: Omit<User, 'password'>;
  token: string;
}

// Configuração do banco de dados
export interface DatabaseConfig {
  type: 'sqlite' | 'supabase';
  sqlitePath?: string;
  supabaseUrl?: string;
  supabaseKey?: string;
}

// Auth Types
export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// Ticket Types
export type TicketHistory = {
  id: string;
  ticketId: string;
  message: string;
  createdAt: string;
  createdBy: {
    id: string;
    name: string;
    role: 'client' | 'technician' | 'admin';
  };
};

export interface Ticket {
  id: string;
  title: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  clientId: string;
  clientName: string;
  companyName?: string;
  technicianId?: string;
  technicianName?: string;
  createdAt: string;
  updatedAt: string;
  history: TicketHistory[];
  category?: string;
}

// UI Types
export type Theme = 'dark' | 'light';

// Chat Types
export interface Message {
  id: string;
  content: string;
  senderId: string;
  senderName: string;
  senderRole: 'client' | 'technician' | 'admin';
  ticketId: string;
  createdAt: string;
}

export interface ChatSession {
  id: string;
  ticketId: string;
  messages: Message[];
  participants: {
    id: string;
    name: string;
    role: 'client' | 'technician' | 'admin';
  }[];
  isActive: boolean;
  startedAt: string;
  endedAt?: string;
}

// Technician Types
export interface Technician extends User {
  isOnline: boolean;
  specialties?: string[];
  assignedTickets?: number;
  completedTickets?: number;
}