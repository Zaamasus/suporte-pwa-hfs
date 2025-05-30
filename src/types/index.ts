// Auth Types
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'client' | 'technician' | 'admin';
  company?: string;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// Ticket Types
export type TicketStatus = 'open' | 'in_progress' | 'completed';
export type TicketPriority = 'low' | 'medium' | 'high';

export interface TicketHistory {
  id: string;
  ticketId: string;
  message: string;
  createdAt: string;
  createdBy: {
    id: string;
    name: string;
    role: 'client' | 'technician' | 'admin';
  };
}

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