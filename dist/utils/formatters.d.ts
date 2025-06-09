import { TicketStatus, TicketPriority } from '../types';
export declare const formatDate: (date: string | Date) => string;
export declare const formatDateTime: (date: string | Date) => string;
export declare const formatRelativeTime: (date: string | Date) => string;
export declare const getTicketStatusText: (status: TicketStatus) => string;
export declare const getTicketStatusColor: (status: TicketStatus) => string;
export declare const getTicketPriorityText: (priority: TicketPriority) => string;
export declare const getTicketPriorityColor: (priority: TicketPriority) => string;
