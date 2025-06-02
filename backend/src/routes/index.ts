import { Router } from 'express';
import userRoutes from './userRoutes';
import authRoutes from './authRoutes';

const router = Router();

// Rotas de autenticação
router.use('/auth', authRoutes);

// Rotas de usuários
router.use('/users', userRoutes);

export default router; 