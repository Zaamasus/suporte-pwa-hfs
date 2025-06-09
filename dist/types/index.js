/**
 * Tipos para o sistema de suporte técnico
 */
export var UserRole;
(function (UserRole) {
    UserRole["ADMIN"] = "admin";
    UserRole["COMPANY"] = "company";
    UserRole["TECHNICIAN"] = "technician";
})(UserRole || (UserRole = {}));
export var TicketStatus;
(function (TicketStatus) {
    TicketStatus["OPEN"] = "open";
    TicketStatus["IN_PROGRESS"] = "in_progress";
    TicketStatus["PAUSED"] = "paused";
    TicketStatus["CLOSED"] = "closed"; // Finalizado
})(TicketStatus || (TicketStatus = {}));
export var TicketPriority;
(function (TicketPriority) {
    TicketPriority["LOW"] = "low";
    TicketPriority["MEDIUM"] = "medium";
    TicketPriority["HIGH"] = "high";
    TicketPriority["CRITICAL"] = "critical";
})(TicketPriority || (TicketPriority = {}));
//# sourceMappingURL=index.js.map