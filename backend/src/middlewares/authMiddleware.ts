import { Request, Response, NextFunction, RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import { supabase } from '../config/supabase';
import { User } from '../models/User'; // Importar o modelo User

// Interface para o payload do usuário que será anexado ao request
export interface UserPayload extends Omit<User, 'password' | 'created_at' | 'updated_at'> {
  // Podemos adicionar mais campos específicos do payload do token se necessário
}

// Estendendo a interface Request para incluir o usuário autenticado
declare global {
  namespace Express {
    interface Request {
      user?: UserPayload; // Usar a interface UserPayload
    }
  }
}

// Não vamos mais exportar AuthenticatedRequest separadamente, 
// vamos confiar na modificação global e fazer type assertion nos controllers se necessário,
// ou garantir que os controllers usem Request e façam a verificação de req.user

export const protect: RequestHandler = async (
  req: Request, // Middleware recebe Request padrão inicialmente
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ message: 'Token de autenticação não fornecido ou mal formatado' });
      return; // Retornar para evitar chamar next() implicitamente
    }

    const token = authHeader.split(' ')[1];
    const secret = process.env.JWT_SECRET || 'default_secret_for_development';

    const decoded = jwt.verify(token, secret) as { id: string }; // Tipar o payload decodificado

    const { data: userRow, error: dbError } = await supabase
      .from('users')
      .select('id, name, email, role, company')
      .eq('id', decoded.id)
      .single();

    if (dbError || !userRow) {
      res.status(401).json({ message: 'Usuário não encontrado ou token inválido' });
      return; // Retornar
    }

    req.user = userRow; // Atribui diretamente ao req.user (que é UserPayload | undefined)
    
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      res.status(401).json({ message: 'Token inválido' });
      return; // Retornar
    }
    if (error instanceof jwt.TokenExpiredError) {
      res.status(401).json({ message: 'Token expirado' });
      return; // Retornar
    }
    console.error('Erro no middleware de autenticação:', error);
    // Passar o erro para o handler de erros do Express
    // Em vez de enviar uma resposta genérica 500 aqui, 
    // é melhor deixar o Express lidar com isso.
    // Se você tiver um middleware de tratamento de erros configurado, ele será chamado.
    // Caso contrário, o Express enviará uma resposta HTML de erro padrão.
    next(error); 
  }
}; 