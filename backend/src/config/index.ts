// Exporta todas as configurações do diretório config
export * from './config';
export * from './cors-config';
export * from './db-config';
export * from './supabase';

// Configurações de inicialização
import { validateConfig } from './config';
import { testConnection } from './supabase';

/**
 * Inicializa as configurações do sistema
 */
export const initializeConfig = async (): Promise<void> => {
  console.log('Inicializando configurações do sistema...');
  
  // Valida as configurações
  validateConfig();
  
  // Testa a conexão com o Supabase
  await testConnection();
  
  console.log('Sistema inicializado com sucesso!');
}; 