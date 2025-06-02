import { supabase } from '../config/supabase';

interface Company {
  id: string;
  name: string;
  cnpj?: string;
  address?: string;
  phone?: string;
  email: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'technician' | 'client';
  company_id?: string;
}

async function createCompany(company: Omit<Company, 'id'>) {
  try {
    const { data, error } = await supabase
      .from('companies')
      .insert(company)
      .select()
      .single();

    if (error) {
      console.error('Erro ao criar empresa:', error);
      return null;
    }

    console.log('Empresa criada com sucesso:', data);
    return data;
  } catch (error) {
    console.error('Erro ao criar empresa:', error);
    return null;
  }
}

async function createUser(user: Omit<User, 'id'>, technicianId: string) {
  try {
    const { data, error } = await supabase
      .from('users')
      .insert({
        ...user,
        created_by: technicianId
      })
      .select()
      .single();

    if (error) {
      console.error('Erro ao criar usuário:', error);
      return null;
    }

    console.log('Usuário criado com sucesso:', data);
    return data;
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    return null;
  }
}

async function listCompanies() {
  try {
    const { data, error } = await supabase
      .from('companies')
      .select('*');

    if (error) {
      console.error('Erro ao listar empresas:', error);
      return;
    }

    console.log('\nEmpresas cadastradas:');
    data.forEach(company => {
      console.log(`- ${company.name} (ID: ${company.id})`);
    });
  } catch (error) {
    console.error('Erro ao listar empresas:', error);
  }
}

async function listUsers() {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*, companies(name)');

    if (error) {
      console.error('Erro ao listar usuários:', error);
      return;
    }

    console.log('\nUsuários cadastrados:');
    data.forEach(user => {
      console.log(`- ${user.name} (${user.role}) - Empresa: ${user.companies?.name || 'Nenhuma'}`);
    });
  } catch (error) {
    console.error('Erro ao listar usuários:', error);
  }
}

// Exemplo de uso:
async function main() {
  // Listar empresas e usuários existentes
  await listCompanies();
  await listUsers();

  // Exemplo de criação de empresa
  const company = await createCompany({
    name: 'Nova Empresa',
    email: 'contato@novaempresa.com',
    cnpj: '12345678901234',
    phone: '(11) 99999-9999',
    address: 'Rua Exemplo, 123'
  });

  if (company) {
    // Exemplo de criação de usuário para a empresa
    await createUser({
      name: 'João Silva',
      email: 'joao@novaempresa.com',
      role: 'client',
      company_id: company.id
    }, 'ID_DO_TECNICO'); // Substitua pelo ID do técnico que está criando o usuário
  }
}

// Executar o script
main(); 