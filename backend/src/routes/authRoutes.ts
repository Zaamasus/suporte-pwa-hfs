import { Router } from 'express';
import * as authController from '../controllers/authController';

const router = Router();

// Registro de novo usuário
router.post('/register', authController.register as any);

// Login
router.post('/login', authController.login as any);

export default router; 