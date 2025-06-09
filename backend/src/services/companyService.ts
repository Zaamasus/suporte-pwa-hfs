import { supabase } from '../config/supabase';
import { Company, CompanyCreate, CompanyUpdate } from '../models/Company';

// Obter todas as empresas
export const getAllCompanies = async (): Promise<Company[]> => {
  const { data, error } = await supabase
    .from('companies')
    .select('*')
    .order('name', { ascending: true });
  
  if (error) {
    throw new Error(`Erro ao buscar empresas: ${error.message}`);
  }
  
  return data || [];
};

// Obter empresa por ID
export const getCompanyById = async (id: string): Promise<Company | null> => {
  const { data, error } = await supabase
    .from('companies')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) {
    if (error.code === 'PGRST116') {
      return null;
    }
    throw new Error(`Erro ao buscar empresa: ${error.message}`);
  }
  
  return data;
};

// Obter empresa por nome
export const getCompanyByName = async (name: string): Promise<Company | null> => {
  const { data, error } = await supabase
    .from('companies')
    .select('*')
    .eq('name', name)
    .single();
  
  if (error) {
    if (error.code === 'PGRST116') {
      return null;
    }
    throw new Error(`Erro ao buscar empresa: ${error.message}`);
  }
  
  return data;
};

// Criar empresa
export const createCompany = async (companyData: CompanyCreate): Promise<Company> => {
  const { data, error } = await supabase
    .from('companies')
    .insert([companyData])
    .select()
    .single();
  
  if (error) {
    throw new Error(`Erro ao criar empresa: ${error.message}`);
  }
  
  return data;
};

// Atualizar empresa
export const updateCompany = async (id: string, companyData: CompanyUpdate): Promise<Company | null> => {
  const { data, error } = await supabase
    .from('companies')
    .update(companyData)
    .eq('id', id)
    .select()
    .single();
  
  if (error) {
    throw new Error(`Erro ao atualizar empresa: ${error.message}`);
  }
  
  return data;
};

// Excluir empresa
export const deleteCompany = async (id: string): Promise<boolean> => {
  const { error } = await supabase
    .from('companies')
    .delete()
    .eq('id', id);
  
  if (error) {
    throw new Error(`Erro ao excluir empresa: ${error.message}`);
  }
  
  return true;
};

// Obter clientes de uma empresa
export const getCompanyClients = async (companyName: string): Promise<any[]> => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('company', companyName)
    .eq('role', 'client');
  
  if (error) {
    throw new Error(`Erro ao buscar clientes da empresa: ${error.message}`);
  }
  
  return data || [];
}; 