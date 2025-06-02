import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { supabase } from '../config/supabase';

// Estendendo a interface Request
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Verificar se o token está presente no cabeçalho
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Token de autenticação não fornecido' });
    }
    
    // Extrair o token
    const token = authHeader.split(' ')[1];
    
    // Verificar o secret
    const secret = process.env.JWT_SECRET || 'default_secret_for_development';
    
    // Verificar e decodificar o token
    const decoded = jwt.verify(token, secret) as any;
    
    // Buscar o usuário no banco de dados
    const { data: user, error } = await supabase
      .from('users')
      .select('id, name, email, role')
      .eq('id', decoded.id)
      .single();
    
    if (error || !user) {
      return res.status(401).json({ message: 'Usuário não encontrado ou token inválido' });
    }
    
    // Adicionar o usuário ao objeto request
    req.user = user;
    
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ message: 'Token inválido' });
    }
    
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ message: 'Token expirado' });
    }
    
    console.error('Erro no middleware de autenticação:', error);
    return res.status(500).json({ message: 'Erro interno do servidor' });
  }
}; 