import { supabase } from '../config/supabase';
import { User } from '../models/User';
import bcrypt from 'bcryptjs';

// Obter todos os usuários
export const getAllUsers = async (): Promise<User[]> => {
  const { data, error } = await supabase
    .from('users')
    .select('id, name, email, role, created_at, updated_at')
    .order('created_at', { ascending: false });
  
  if (error) {
    throw new Error(`Erro ao buscar usuários: ${error.message}`);
  }
  
  return data || [];
};

// Obter usuário por ID
export const getUserById = async (id: string): Promise<User | null> => {
  const { data, error } = await supabase
    .from('users')
    .select('id, name, email, role, created_at, updated_at')
    .eq('id', id)
    .single();
  
  if (error) {
    if (error.code === 'PGRST116') {
      // Código para "não encontrado"
      return null;
    }
    throw new Error(`Erro ao buscar usuário: ${error.message}`);
  }
  
  return data;
};

// Criar usuário
export const createUser = async (userData: Partial<User>): Promise<User> => {
  const { data, error } = await supabase
    .from('users')
    .insert([userData])
    .select()
    .single();
  
  if (error) {
    throw new Error(`Erro ao criar usuário: ${error.message}`);
  }
  
  return data;
};

// Atualizar usuário
export const updateUser = async (id: string, userData: Partial<User>): Promise<User | null> => {
  // Remover campos que não devem ser atualizados diretamente
  const { id: _, created_at, password, ...updateData } = userData as any;

  // Se for enviada uma nova senha, faz o hash
  if (password) {
    updateData.password = await bcrypt.hash(password, 10);
  }

  // is_blocked já será aceito normalmente

  const { data, error } = await supabase
    .from('users')
    .update(updateData)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    throw new Error(`Erro ao atualizar usuário: ${error.message}`);
  }

  return data;
};

// Excluir usuário
export const deleteUser = async (id: string): Promise<boolean> => {
  const { error } = await supabase
    .from('users')
    .delete()
    .eq('id', id);
  
  if (error) {
    throw new Error(`Erro ao excluir usuário: ${error.message}`);
  }
  
  return true;
};

export const getAllTechnicians = async (): Promise<User[]> => {
  const { data, error } = await supabase
    .from('users')
    .select('id, name, email, company, role, specialties, created_at, updated_at')
    .eq('role', 'technician');

  if (error) {
    throw new Error(`Erro ao buscar técnicos: ${error.message}`);
  }
  return data || [];
};

export const getAllClients = async (_user: any): Promise<User[]> => {
  // Buscar todos os clientes, independente da empresa
  const { data, error } = await supabase
    .from('users')
    .select('id, name, email, company, role, created_at, updated_at')
    .eq('role', 'client');

  if (error) {
    throw new Error(`Erro ao buscar clientes: ${error.message}`);
  }

  return data || [];
}; 