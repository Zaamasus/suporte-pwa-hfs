import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { supabase } from '../config/supabase';
import { User, UserCreate } from '../models/User';
import * as userService from './userService';

// Verificar se um email já existe
export const checkEmailExists = async (email: string): Promise<boolean> => {
  const { data, error } = await supabase
    .from('users')
    .select('id')
    .eq('email', email)
    .single();
  
  if (error && error.code !== 'PGRST116') {
    throw new Error(`Erro ao verificar email: ${error.message}`);
  }
  
  return !!data;
};

// Registrar um novo usuário
export const register = async (userData: UserCreate): Promise<User> => {
  // Hash da senha
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(userData.password, salt);
  
  // Criar usuário com senha hasheada
  const newUser = {
    name: userData.name,
    email: userData.email,
    password: hashedPassword,
    role: userData.role || 'user'
  };
  
  return userService.createUser(newUser);
};

// Login
export const login = async (email: string, password: string): Promise<User | null> => {
  console.log(`Tentativa de login: ${email}`);
  
  // Buscar usuário pelo email
  const { data: user, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single();
  
  if (error) {
    console.error(`Erro ao buscar usuário: ${error.message}`, error);
    return null;
  }
  
  if (!user) {
    console.log(`Usuário não encontrado: ${email}`);
    return null;
  }
  
  console.log(`Usuário encontrado: ${user.name} (${user.email}), role: ${user.role}`);
  console.log(`Senha armazenada (primeiros 10 caracteres): ${user.password?.substring(0, 10)}...`);
  
  // Verificar senha
  try {
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log(`Resultado da validação de senha: ${isPasswordValid ? 'válida' : 'inválida'}`);
    
    if (!isPasswordValid) {
      return null;
    }
    
    // Remover senha antes de retornar
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword as User;
  } catch (err) {
    console.error(`Erro ao comparar senhas: ${err instanceof Error ? err.message : String(err)}`);
    return null;
  }
};

// Gerar token JWT com uma solução simplificada para contornar problemas de tipo
export const generateToken = (userId: string): string => {
  const secretKey = process.env.JWT_SECRET || 'default_secret_for_development';
  
  try {
    // @ts-ignore - Ignorando verificação de tipo para simplificar
    return jwt.sign({ id: userId }, secretKey, { expiresIn: '7d' });
  } catch (error) {
    console.error('Erro ao gerar token JWT:', error);
    throw new Error('Erro ao gerar token de autenticação');
  }
}; 