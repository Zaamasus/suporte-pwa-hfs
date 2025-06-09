import { z } from 'zod';
import { Ticket } from '../../types';
declare const ticketSchema: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodString;
    priority: z.ZodEnum<["low", "medium", "high"]>;
    category: z.ZodString;
}, "strip", z.ZodTypeAny, {
    title: string;
    description: string;
    priority: "low" | "medium" | "high";
    category: string;
}, {
    title: string;
    description: string;
    priority: "low" | "medium" | "high";
    category: string;
}>;
type TicketFormData = z.infer<typeof ticketSchema>;
interface TicketFormProps {
    onSubmit: (data: TicketFormData) => void;
    isLoading: boolean;
    initialData?: Partial<Ticket>;
}
export declare function TicketForm({ onSubmit, isLoading, initialData }: TicketFormProps): import("react/jsx-runtime").JSX.Element;
export {};
