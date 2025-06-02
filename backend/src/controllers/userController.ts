import { Request, Response } from 'express';
import * as userService from '../services/userService';

// Obter usuário atual
export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Usuário não autenticado (erro inesperado no controller)' });
    }
    const user = await userService.getUserById(req.user.id);
    
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    
    const { password, ...userWithoutPassword } = user;
    return res.json(userWithoutPassword);
  } catch (error) {
    console.error('Erro ao obter usuário atual:', error);
    return res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

// Obter todos os usuários
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    if (!req.user || req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Não autorizado para ver todos os usuários' });
    }
    const users = await userService.getAllUsers();
    return res.json(users);
  } catch (error) {
    console.error('Erro ao obter todos os usuários:', error);
    return res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

// Obter usuário por ID
export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await userService.getUserById(id);
    
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    const { password, ...userWithoutPassword } = user;
    return res.json(userWithoutPassword);
  } catch (error) {
    console.error('Erro ao obter usuário por ID:', error);
    return res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

// Atualizar usuário
export const updateUser = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Usuário não autenticado (erro inesperado no controller)' });
    }
    const { id } = req.params;
    const userData = req.body;
    
    if (req.user.id !== id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Não autorizado para atualizar este usuário' });
    }
    
    delete userData.password;
    delete userData.role;

    const updatedUser = await userService.updateUser(id, userData);
    
    if (!updatedUser) {
      return res.status(404).json({ message: 'Usuário não encontrado para atualização' });
    }
    const { password, ...userWithoutPassword } = updatedUser;
    return res.json(userWithoutPassword);
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    return res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

// Excluir usuário
export const deleteUser = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Usuário não autenticado (erro inesperado no controller)' });
    }
    const { id } = req.params;
    
    if (req.user.id !== id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Não autorizado para excluir este usuário' });
    }
    
    if (req.user.id === id && req.user.role === 'admin') {
      // Lógica para impedir admin de se auto-excluir pode ser adicionada aqui se desejado
    }

    const deleted = await userService.deleteUser(id);
    
    if (!deleted) {
      return res.status(404).json({ message: 'Usuário não encontrado ou não pôde ser excluído' });
    }
    
    return res.status(204).send();
  } catch (error) {
    console.error('Erro ao excluir usuário:', error);
    return res.status(500).json({ message: 'Erro interno do servidor' });
  }
}; 