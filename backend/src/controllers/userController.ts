import { Request, Response } from 'express';
import * as userService from '../services/userService';

// Obter usuário atual
export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const user = await userService.getUserById(userId);
    
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    
    return res.json(user);
  } catch (error) {
    console.error('Erro ao obter usuário atual:', error);
    return res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

// Obter todos os usuários
export const getAllUsers = async (req: Request, res: Response) => {
  try {
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
    
    return res.json(user);
  } catch (error) {
    console.error('Erro ao obter usuário por ID:', error);
    return res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

// Atualizar usuário
export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userData = req.body;
    
    // Verifica se o usuário está tentando atualizar outro usuário
    if (req.user.id !== id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Não autorizado' });
    }
    
    const updatedUser = await userService.updateUser(id, userData);
    
    if (!updatedUser) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    
    return res.json(updatedUser);
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    return res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

// Excluir usuário
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    // Verifica se o usuário está tentando excluir outro usuário
    if (req.user.id !== id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Não autorizado' });
    }
    
    const deleted = await userService.deleteUser(id);
    
    if (!deleted) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    
    return res.status(204).send();
  } catch (error) {
    console.error('Erro ao excluir usuário:', error);
    return res.status(500).json({ message: 'Erro interno do servidor' });
  }
}; 