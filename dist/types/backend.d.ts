/**
 * Tipos para o sistema de suporte técnico (Backend)
 */
import { Request } from 'express';
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
export declare enum UserRole {
    ADMIN = "admin",
    COMPANY = "company",
    TECHNICIAN = "technician"
}
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
export declare enum TicketStatus {
    OPEN = "open",
    IN_PROGRESS = "in_progress",
    WAITING = "waiting",
    CLOSED = "closed"
}
export declare enum TicketPriority {
    LOW = "low",
    MEDIUM = "medium",
    HIGH = "high",
    CRITICAL = "critical"
}
export interface TicketComment {
    id: string;
    ticketId: string;
    userId: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
}
export interface Technician {
    id: string;
    userId: string;
    specialties?: string[];
    available: boolean;
    createdAt: Date;
    updatedAt: Date;
}
export interface JwtPayload {
    userId: string;
    email: string;
    role: UserRole;
    companyId?: string;
}
export interface AuthRequest extends Request {
    user?: JwtPayload;
}
export interface AuthResponse {
    user: Omit<User, 'password'>;
    token: string;
}
export interface DatabaseConfig {
    type: 'sqlite' | 'supabase';
    sqlitePath?: string;
    supabaseUrl?: string;
    supabaseKey?: string;
}
