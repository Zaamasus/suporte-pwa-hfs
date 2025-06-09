import express from 'express';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import ticketRoutes from './routes/ticketRoutes';
import companyRoutes from './routes/companyRoutes';
import { errorHandler } from './middlewares/errorMiddleware';

const app = express();

console.log('VERSÃO DE DEBUG: CORS LIBERADO E /cors-test ATIVO');

// Middleware CORS liberando para qualquer origem (apenas para teste)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
  res.header('Access-Control-Max-Age', '86400');
  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }
  next();
});

app.use(express.json());

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/companies', companyRoutes);

app.get('/cors-test', (req, res) => {
  res.json({ message: 'CORS liberado', origin: req.headers.origin });
});

// Middleware de tratamento de erros
app.use(errorHandler);

export default app; 