import { Request, Response } from 'express';
import * as companyService from '../services/companyService';

// Obter todas as empresas
export const getAllCompanies = async (req: Request, res: Response) => {
  try {
    const companies = await companyService.getAllCompanies();
    res.json(companies);
  } catch (error) {
    console.error('Erro ao buscar empresas:', error);
    res.status(500).json({ message: 'Erro ao buscar empresas' });
  }
};

// Obter empresa por ID
export const getCompanyById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const company = await companyService.getCompanyById(id);
    
    if (!company) {
      return res.status(404).json({ message: 'Empresa não encontrada' });
    }
    
    res.json(company);
  } catch (error) {
    console.error('Erro ao buscar empresa por ID:', error);
    res.status(500).json({ message: 'Erro ao buscar empresa' });
  }
};

// Obter empresa por nome
export const getCompanyByName = async (req: Request, res: Response) => {
  try {
    const { name } = req.params;
    const company = await companyService.getCompanyByName(name);
    
    if (!company) {
      return res.status(404).json({ message: 'Empresa não encontrada' });
    }
    
    res.json(company);
  } catch (error) {
    console.error('Erro ao buscar empresa por nome:', error);
    res.status(500).json({ message: 'Erro ao buscar empresa' });
  }
};

// Criar empresa
export const createCompany = async (req: Request, res: Response) => {
  try {
    const companyData = req.body;
    
    // Verificar se a empresa já existe
    const existingCompany = await companyService.getCompanyByName(companyData.name);
    if (existingCompany) {
      return res.status(400).json({ message: 'Já existe uma empresa com este nome' });
    }
    
    const newCompany = await companyService.createCompany(companyData);
    res.status(201).json(newCompany);
  } catch (error) {
    console.error('Erro ao criar empresa:', error);
    res.status(500).json({ message: 'Erro ao criar empresa' });
  }
};

// Atualizar empresa
export const updateCompany = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const companyData = req.body;
    
    // Verificar se a empresa existe
    const existingCompany = await companyService.getCompanyById(id);
    if (!existingCompany) {
      return res.status(404).json({ message: 'Empresa não encontrada' });
    }
    
    // Se estiver alterando o nome, verificar se já existe outra empresa com este nome
    if (companyData.name && companyData.name !== existingCompany.name) {
      const companyWithSameName = await companyService.getCompanyByName(companyData.name);
      if (companyWithSameName && companyWithSameName.id !== id) {
        return res.status(400).json({ message: 'Já existe outra empresa com este nome' });
      }
    }
    
    const updatedCompany = await companyService.updateCompany(id, companyData);
    res.json(updatedCompany);
  } catch (error) {
    console.error('Erro ao atualizar empresa:', error);
    res.status(500).json({ message: 'Erro ao atualizar empresa' });
  }
};

// Excluir empresa
export const deleteCompany = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    // Verificar se a empresa existe
    const existingCompany = await companyService.getCompanyById(id);
    if (!existingCompany) {
      return res.status(404).json({ message: 'Empresa não encontrada' });
    }
    
    await companyService.deleteCompany(id);
    res.status(204).send();
  } catch (error) {
    console.error('Erro ao excluir empresa:', error);
    res.status(500).json({ message: 'Erro ao excluir empresa' });
  }
};

// Obter clientes de uma empresa
export const getCompanyClients = async (req: Request, res: Response) => {
  try {
    const { name } = req.params;
    
    // Verificar se a empresa existe
    const existingCompany = await companyService.getCompanyByName(name);
    if (!existingCompany) {
      return res.status(404).json({ message: 'Empresa não encontrada' });
    }
    
    const clients = await companyService.getCompanyClients(name);
    res.json(clients);
  } catch (error) {
    console.error('Erro ao buscar clientes da empresa:', error);
    res.status(500).json({ message: 'Erro ao buscar clientes da empresa' });
  }
}; 