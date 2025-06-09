import { CorsOptions } from 'cors';
import { config } from './config';

/**
 * Configurações para o middleware CORS
 */
export const corsOptions: CorsOptions = {
  // Origens permitidas
  origin: config.server.env === 'production'
    ? [
        'https://seu-dominio-frontend.com',
        'https://www.seu-dominio-frontend.com'
      ]
    : '*',
  
  // Cabeçalhos permitidos
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Requested-With',
    'Accept'
  ],
  
  // Métodos permitidos
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  
  // Permitir credenciais (cookies)
  credentials: true,
  
  // Tempo máximo de cache para respostas preflight (em segundos)
  maxAge: 86400 // 24 horas
}; 