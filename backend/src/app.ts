import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import ticketRoutes from './routes/ticketRoutes';
import companyRoutes from './routes/companyRoutes';
import { errorHandler } from './middlewares/errorMiddleware';

const app = express();

// Middleware para adicionar headers CORS manualmente
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://zaamasus.github.io');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  next();
});

// Configuração do CORS como fallback
app.use(cors({
  origin: 'https://zaamasus.github.io',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  preflightContinue: false,
  optionsSuccessStatus: 204
}));

app.use(express.json());

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/companies', companyRoutes);

// Middleware de tratamento de erros
app.use(errorHandler);

export default app; 