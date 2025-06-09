import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import ticketRoutes from './routes/ticketRoutes';
import companyRoutes from './routes/companyRoutes';
import { errorHandler } from './middlewares/errorMiddleware';

const app = express();

// Configuração simplificada do CORS
app.use(cors({
  origin: 'https://zaamasus.github.io',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
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