import { Request, Response, NextFunction } from 'express';

// Tipo para funções de controlador que podem retornar void ou Response
type ControllerFunction = (req: Request, res: Response) => Promise<void | Response>;

/**
 * Wrapper para controladores que:
 * 1. Garante tratamento de erros consistente
 * 2. Resolve problemas de tipagem com o Express
 * 3. Mantém a assinatura correta para middlewares
 */
export const wrapController = (controller: ControllerFunction) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await controller(req, res);
    } catch (error) {
      next(error);
    }
  };
}; 