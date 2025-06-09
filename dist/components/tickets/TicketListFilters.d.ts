interface TicketFilters {
    search: string;
    status: string;
    priority: string;
    sortBy: string;
}
interface TicketListFiltersProps {
    onFilter: (filters: TicketFilters) => void;
}
export declare function TicketListFilters({ onFilter }: TicketListFiltersProps): import("react/jsx-runtime").JSX.Element;
export {};
