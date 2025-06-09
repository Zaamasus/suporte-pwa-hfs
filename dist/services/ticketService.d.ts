export interface Ticket {
    id: string;
    title: string;
    description: string;
    status: 'open' | 'in_progress' | 'resolved' | 'closed';
    priority: 'low' | 'medium' | 'high';
    client_id: string;
    client_name?: string;
    assigned_to?: string;
    technician_id?: string;
    technician_name?: string;
    company: string;
    created_at: string;
    updated_at: string;
}
export interface TicketCreate {
    title: string;
    description: string;
    priority: 'low' | 'medium' | 'high';
    client_id: string;
    client_name?: string;
    company: string;
}
export interface TicketUpdate {
    title?: string;
    description?: string;
    status?: 'open' | 'in_progress' | 'resolved' | 'closed';
    priority?: 'low' | 'medium' | 'high';
    technician_id?: string;
    technician_name?: string;
}
interface GetTicketsParams {
    userId: string;
    userRole: string;
    status?: string;
    priority?: string;
    search?: string;
    sortBy?: string;
    assignedTo?: string;
    company?: string;
}
export declare const getAllTickets: (params: GetTicketsParams) => Promise<Ticket[]>;
export declare const getTicketById: (id: string) => Promise<Ticket | null>;
export declare const createTicket: (ticketData: TicketCreate) => Promise<Ticket>;
export declare const updateTicket: (id: string, ticketData: TicketUpdate) => Promise<Ticket | null>;
export declare const deleteTicket: (id: string) => Promise<boolean>;
export {};
