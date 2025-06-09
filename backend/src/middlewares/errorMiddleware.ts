import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('Erro na aplicação:', err);

  // Se for um erro de validação ou outro erro conhecido, retorna 400
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      message: err.message
    });
  }

  // Se for um erro de autenticação, retorna 401
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({
      message: 'Não autorizado'
    });
  }

  // Para outros erros, retorna 500
  res.status(500).json({
    message: 'Erro interno do servidor'
  });
}; 