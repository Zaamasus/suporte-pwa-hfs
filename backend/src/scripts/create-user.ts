import { supabase } from '../config';
import bcrypt from 'bcryptjs';
import { config } from '../config';

async function createUser() {
  try {
    console.log('Criando usuário...');
    
    // Verificar se a tabela users existe
    const { data: tablesData, error: tablesError } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'public')
      .eq('table_name', 'users');
    
    if (tablesError) {
      console.error('Erro ao verificar tabela:', tablesError);
      
      // Tentar criar o usuário mesmo assim
      console.log('Tentando criar usuário mesmo assim...');
    } else if (!tablesData || tablesData.length === 0) {
      console.log('A tabela users não existe. Criando tabela...');
      
      // Criar a tabela (simplificada)
      const createTableQuery = `
      CREATE TABLE IF NOT EXISTS public.users (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password TEXT NOT NULL,
        role VARCHAR(20) DEFAULT 'user',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );`;
      
      // Não podemos executar SQL diretamente, mas vamos tentar criar o usuário mesmo assim
      console.log('Não é possível criar tabela via API, tentando criar usuário...');
    }
    
    // Criptografar a senha
    const salt = await bcrypt.genSalt(config.security.bcryptSaltRounds);
    const hashedPassword = await bcrypt.hash('admin123', salt);
    
    // Criar o usuário
    const { data, error } = await supabase
      .from('users')
      .insert({
        name: 'Administrador',
        email: 'admin@example.com',
        password: hashedPassword,
        role: 'admin',
      })
      .select();
    
    if (error) {
      console.error('Erro ao criar usuário:', error);
      return;
    }
    
    console.log('Usuário criado com sucesso!');
    console.log('Dados do usuário:', data);
    console.log('Email: admin@example.com');
    console.log('Senha: admin123');
    
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
  }
}

// Executar a função
createUser(); 