/**
 * Tipos para o sistema de suporte técnico
 */
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
    OPEN = "open",// Em aberto
    IN_PROGRESS = "in_progress",// Em andamento
    PAUSED = "paused",// Em pausa
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
export interface AuthRequest extends Express.Request {
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
export interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
}
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
export type Theme = 'dark' | 'light';
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
export interface Technician extends User {
    isOnline: boolean;
    specialties?: string[];
    assignedTickets?: number;
    completedTickets?: number;
}
export interface Attachment {
    id: string;
    url: string;
    originalname: string;
    mimetype: string;
    size: number;
    createdAt: string;
}
