import { Request, Response } from 'express';
import * as authService from '../services/authService';

// Registro de novo usuário
export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    
    // Validações básicas
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Nome, email e senha são obrigatórios' });
    }
    
    // Verifica se o email já está em uso
    const emailExists = await authService.checkEmailExists(email);
    if (emailExists) {
      return res.status(400).json({ message: 'Este email já está em uso' });
    }
    
    // Cria o usuário
    const user = await authService.register({ name, email, password });
    
    // Gera o token de autenticação
    const token = authService.generateToken(user.id);
    
    return res.status(201).json({ user, token });
  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
    return res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

// Login
export const login = async (req: Request, res: Response) => {
  try {
    console.log('Requisição de login recebida:', req.body);
    const { email, password } = req.body;
    
    // Validações básicas
    if (!email || !password) {
      console.log('Email ou senha não fornecidos');
      return res.status(400).json({ message: 'Email e senha são obrigatórios' });
    }
    
    console.log(`Tentando login para: ${email} com senha: ${password.substring(0, 1)}${'*'.repeat(password.length - 1)}`);
    
    // Verifica se o usuário existe e a senha está correta
    const user = await authService.login(email, password);
    
    if (!user) {
      console.log('Login falhou: usuário não encontrado ou senha inválida');
      return res.status(401).json({ message: 'Email ou senha inválidos' });
    }
    
    // Gera o token de autenticação
    const token = authService.generateToken(user.id);
    
    console.log(`Login bem-sucedido para: ${user.name} (${user.email})`);
    return res.json({ user, token });
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    return res.status(500).json({ message: 'Erro interno do servidor' });
  }
}; 