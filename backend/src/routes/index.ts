import { Router } from 'express';
import userRoutes from './userRoutes';
import authRoutes from './authRoutes';
import ticketRoutes from './ticketRoutes';

const router = Router();

// Rotas de autenticação
router.use('/auth', authRoutes);

// Rotas de usuários
router.use('/users', userRoutes);

// Rotas de tickets
router.use('/tickets', ticketRoutes);

export default router; 