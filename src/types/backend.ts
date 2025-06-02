/**
 * Tipos para o sistema de suporte técnico (Backend)
 */

import { Request } from 'express';

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
  OPEN = 'open',
  IN_PROGRESS = 'in_progress',
  WAITING = 'waiting',
  CLOSED = 'closed'
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
export interface AuthRequest extends Request {
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