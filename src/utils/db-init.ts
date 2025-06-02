import { Database } from 'sqlite';
import getDb from '../config/sqlite';

/**
 * Inicializa as tabelas do banco de dados SQLite
 */
export const initializeDatabase = async (): Promise<void> => {
  try {
    const db = await getDb();
    
    // Tabela de usuários
    await db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT,
        role TEXT NOT NULL,
        companyId TEXT,
        createdAt TEXT NOT NULL,
        updatedAt TEXT NOT NULL
      )
    `);
    
    // Tabela de empresas
    await db.exec(`
      CREATE TABLE IF NOT EXISTS companies (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        cnpj TEXT UNIQUE,
        address TEXT,
        phone TEXT,
        email TEXT UNIQUE NOT NULL,
        createdAt TEXT NOT NULL,
        updatedAt TEXT NOT NULL
      )
    `);
    
    // Tabela de tickets
    await db.exec(`
      CREATE TABLE IF NOT EXISTS tickets (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        status TEXT NOT NULL,
        priority TEXT NOT NULL,
        companyId TEXT NOT NULL,
        technicianId TEXT,
        createdBy TEXT NOT NULL,
        closedAt TEXT,
        createdAt TEXT NOT NULL,
        updatedAt TEXT NOT NULL,
        FOREIGN KEY (companyId) REFERENCES companies (id),
        FOREIGN KEY (technicianId) REFERENCES technicians (id),
        FOREIGN KEY (createdBy) REFERENCES users (id)
      )
    `);
    
    // Tabela de técnicos
    await db.exec(`
      CREATE TABLE IF NOT EXISTS technicians (
        id TEXT PRIMARY KEY,
        userId TEXT UNIQUE NOT NULL,
        specialties TEXT,
        available INTEGER NOT NULL DEFAULT 1,
        createdAt TEXT NOT NULL,
        updatedAt TEXT NOT NULL,
        FOREIGN KEY (userId) REFERENCES users (id)
      )
    `);
    
    // Tabela de comentários em tickets
    await db.exec(`
      CREATE TABLE IF NOT EXISTS ticket_comments (
        id TEXT PRIMARY KEY,
        ticketId TEXT NOT NULL,
        userId TEXT NOT NULL,
        content TEXT NOT NULL,
        createdAt TEXT NOT NULL,
        updatedAt TEXT NOT NULL,
        FOREIGN KEY (ticketId) REFERENCES tickets (id),
        FOREIGN KEY (userId) REFERENCES users (id)
      )
    `);
    
    console.log('Banco de dados SQLite inicializado com sucesso');
  } catch (error) {
    console.error('Erro ao inicializar banco de dados SQLite:', error);
    throw error;
  }
};

/**
 * Inicializa o banco de dados para desenvolvimento (adiciona dados de exemplo)
 */
export const initDevDatabase = async (): Promise<void> => {
  try {
    await initializeDatabase();
    
    const db = await getDb();
    
    // Verificar se já existem dados
    const adminCount = await db.get('SELECT COUNT(*) as count FROM users WHERE role = ?', ['admin']);
    
    if (adminCount && adminCount.count > 0) {
      console.log('Banco de dados de desenvolvimento já está populado');
      return;
    }
    
    // Criar admin padrão se não existir
    await db.run(`
      INSERT INTO users (id, name, email, password, role, createdAt, updatedAt)
      VALUES (
        'admin-123',
        'Administrador',
        'admin@exemplo.com',
        '$2a$10$3Qzj1Nj9hKD1WXQ7wnxH1eOYEB.wTDMm6.4.4oZ8VLB/MXB9yOiEO', -- senha123
        'admin',
        datetime('now'),
        datetime('now')
      )
    `);
    
    console.log('Dados de exemplo adicionados ao banco de dados');
  } catch (error) {
    console.error('Erro ao inicializar banco de dados de desenvolvimento:', error);
    throw error;
  }
};

export default {
  initializeDatabase,
  initDevDatabase
}; 