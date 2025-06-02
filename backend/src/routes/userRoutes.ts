import { Router } from 'express';
import * as userController from '../controllers/userController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

// Rotas protegidas - requerem autenticação
router.use(authMiddleware as any);

// Obter usuário atual
router.get('/me', userController.getCurrentUser as any);

// Obter todos os usuários
router.get('/', userController.getAllUsers as any);

// Obter usuário por ID
router.get('/:id', userController.getUserById as any);

// Atualizar usuário
router.put('/:id', userController.updateUser as any);

// Excluir usuário
router.delete('/:id', userController.deleteUser as any);

export default router; 