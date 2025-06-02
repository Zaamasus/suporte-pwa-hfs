import { Router } from 'express';
import * as userController from '../controllers/userController';
import { protect } from '../middlewares/authMiddleware';
import { wrapController } from '../utils/controllerWrapper';

const router = Router();

// Rotas protegidas - requerem autenticação
router.use(protect);

// Obter usuário atual
router.get('/me', wrapController(userController.getCurrentUser));

// Obter todos os usuários
router.get('/', wrapController(userController.getAllUsers));

// Obter usuário por ID
router.get('/:id', wrapController(userController.getUserById));

// Atualizar usuário
router.put('/:id', wrapController(userController.updateUser));

// Excluir usuário
router.delete('/:id', wrapController(userController.deleteUser));

export default router; 