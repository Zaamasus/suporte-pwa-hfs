import { TicketStatus } from '../types';
interface StatusConfig {
    text: string;
    color: 'primary' | 'warning' | 'success' | 'secondary';
    bgColor: string;
    textColor: string;
}
export declare function getTicketStatusColor(status: TicketStatus): string;
export declare function getTicketStatusText(status: TicketStatus): string;
export declare function getTicketStatusConfig(status: TicketStatus): StatusConfig;
export {};
