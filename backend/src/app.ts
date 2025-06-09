import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import ticketRoutes from './routes/ticketRoutes';
import companyRoutes from './routes/companyRoutes';
import { errorHandler } from './middlewares/errorMiddleware';

const app = express();

// Configuração do CORS
const corsOptions = {
  origin: 'https://zaamasus.github.io',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  exposedHeaders: ['Content-Range', 'X-Content-Range'],
  credentials: true,
  maxAge: 86400, // 24 horas
  preflightContinue: false,
  optionsSuccessStatus: 204
};

// Middleware para garantir headers CORS
app.use((req, res, next) => {
  // Configuração específica para preflight requests
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Origin', 'https://zaamasus.github.io');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Max-Age', '86400');
    return res.status(204).end();
  }

  // Configuração para outras requisições
  res.header('Access-Control-Allow-Origin', 'https://zaamasus.github.io');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

// Aplicar configuração CORS
app.use(cors(corsOptions));

app.use(express.json());

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/companies', companyRoutes);

// Middleware de tratamento de erros
app.use(errorHandler);

export default app; 