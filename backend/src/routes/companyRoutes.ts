import { Router } from 'express';
import * as companyController from '../controllers/companyController';
import { protect } from '../middlewares/authMiddleware';
import { wrapController } from '../utils/controllerWrapper';

const router = Router();

// Rotas protegidas - requerem autenticação
router.use(protect);

// Obter todas as empresas
router.get('/', wrapController(companyController.getAllCompanies));

// Criar nova empresa
router.post('/', wrapController(companyController.createCompany));

// Obter empresa por ID
router.get('/id/:id', wrapController(companyController.getCompanyById));

// Obter empresa por nome
router.get('/name/:name', wrapController(companyController.getCompanyByName));

// Obter clientes de uma empresa
router.get('/name/:name/clients', wrapController(companyController.getCompanyClients));

// Atualizar empresa
router.put('/:id', wrapController(companyController.updateCompany));

// Excluir empresa
router.delete('/:id', wrapController(companyController.deleteCompany));

export default router; 