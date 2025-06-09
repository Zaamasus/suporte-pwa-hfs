// Arquivo de barril (barrel file) para exportar componentes e utilitários
// Exporta componentes e páginas
export * from './pages/Login';
export * from './pages/Dashboard';
export * from './pages/TicketsList';
export * from './pages/TicketDetails';
export * from './pages/ClientsList';
export * from './pages/NewTicket';
export * from './pages/NewClient';
// Exporta contextos específicos diretamente
export * from './contexts/AuthContext';
export * from './contexts/ThemeContext';
// Exporta utilitários específicos diretamente
export * from './utils/formatters';
export * from './utils/authUtils';
export * from './utils/db-init';
// Nota: Tipos são importados diretamente onde necessário
// em vez de serem re-exportados aqui para evitar conflitos 
//# sourceMappingURL=index.js.map