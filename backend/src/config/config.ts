import dotenv from 'dotenv';

// Carrega variáveis de ambiente
dotenv.config();

// Configurações gerais da aplicação
export const config = {
  // Configurações do servidor
  server: {
    port: process.env.PORT || 3000,
    env: process.env.NODE_ENV || 'development',
    jwtSecret: process.env.JWT_SECRET || 'meu_segredo_super_secreto',
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d'
  },
  
  // Configurações do Supabase
  supabase: {
    url: process.env.SUPABASE_URL || 'https://gxmuywjmzdwswzebqggs.supabase.co',
    key: process.env.SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd4bXV5d2ptemR3c3d6ZWJxZ2dzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg3MjMxNjcsImV4cCI6MjA2NDI5OTE2N30.XQ1nW3xINThB6MWcx-XuJLMP3relXtbBPIb8-8i-r2U'
  },
  
  // Configurações de segurança
  security: {
    bcryptSaltRounds: 10,
    passwordMinLength: 6
  },
  
  // Configurações de paginação
  pagination: {
    defaultLimit: 10,
    maxLimit: 100
  }
};

/**
 * Verifica se as configurações obrigatórias estão definidas
 */
export const validateConfig = (): void => {
  const requiredVars = [
    { name: 'JWT_SECRET', value: config.server.jwtSecret },
    { name: 'SUPABASE_URL', value: config.supabase.url },
    { name: 'SUPABASE_KEY', value: config.supabase.key }
  ];
  
  for (const variable of requiredVars) {
    if (!variable.value) {
      console.warn(`Aviso: ${variable.name} não está definido nas variáveis de ambiente!`);
    }
  }
  
  if (config.server.env === 'production') {
    if (config.server.jwtSecret === 'meu_segredo_super_secreto') {
      console.warn('AVISO DE SEGURANÇA: Você está usando a chave JWT padrão em ambiente de produção!');
    }
  }
}; 