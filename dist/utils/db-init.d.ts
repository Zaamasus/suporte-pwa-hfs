/**
 * Inicializa as tabelas do banco de dados SQLite
 */
export declare const initializeDatabase: () => Promise<void>;
/**
 * Inicializa o banco de dados para desenvolvimento (adiciona dados de exemplo)
 */
export declare const initDevDatabase: () => Promise<void>;
declare const _default: {
    initializeDatabase: () => Promise<void>;
    initDevDatabase: () => Promise<void>;
};
export default _default;
