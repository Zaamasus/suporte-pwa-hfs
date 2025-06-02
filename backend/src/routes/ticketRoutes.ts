import { Router } from 'express';
import * as ticketController from '../controllers/ticketController';
import { protect } from '../middlewares/authMiddleware';
import { wrapController } from '../utils/controllerWrapper';

const router = Router();

// Rota para buscar todos os tickets (com filtros)
router.get('/', protect, wrapController(ticketController.getTickets));

// Rota para buscar um ticket específico por ID
router.get('/:id', protect, wrapController(ticketController.getTicketById));

// Rota para criar um novo ticket
router.post('/', protect, wrapController(ticketController.createTicket));

// Rota para atualizar um ticket existente
router.put('/:id', protect, wrapController(ticketController.updateTicket));
router.patch('/:id', protect, wrapController(ticketController.updateTicket)); // Alias para PUT

// Rota para deletar um ticket
router.delete('/:id', protect, wrapController(ticketController.deleteTicket));

export default router;