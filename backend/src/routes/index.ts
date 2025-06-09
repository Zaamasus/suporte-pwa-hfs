import { Router } from 'express';
import userRoutes from './userRoutes';
import authRoutes from './authRoutes';
import ticketRoutes from './ticketRoutes';
import companyRoutes from './companyRoutes';

const router = Router();

// Rotas de autenticação
router.use('/auth', authRoutes);

// Rotas de usuários
router.use('/users', userRoutes);

// Rotas de tickets
router.use('/tickets', ticketRoutes);

// Rotas de empresas
router.use('/companies', companyRoutes);

export default router; 