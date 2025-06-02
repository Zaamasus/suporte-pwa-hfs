import { supabase } from '../config';
import { userTableSQL } from '../config/db-config';
import bcrypt from 'bcryptjs';
import { config } from '../config';

async function initDatabase() {
  try {
    console.log('Inicializando banco de dados...');
    
    // Criando tabela de usuários
    console.log('Criando tabela de usuários...');
    const { error: tableError } = await supabase.rpc('exec', { query: userTableSQL });
    
    if (tableError) {
      console.error('Erro ao criar tabela de usuários:', tableError);
      return;
    }
    
    console.log('Tabela de usuários criada com sucesso!');
    
    // Criando usuário administrador
    console.log('Criando usuário administrador...');
    
    // Criptografar a senha
    const salt = await bcrypt.genSalt(config.security.bcryptSaltRounds);
    const hashedPassword = await bcrypt.hash('admin123', salt);
    
    // Inserir o usuário admin
    const { data, error } = await supabase
      .from('users')
      .insert({
        name: 'Administrador',
        email: 'admin@example.com',
        password: hashedPassword,
        role: 'admin',
      })
      .select()
      .single();
    
    if (error) {
      console.error('Erro ao criar usuário admin:', error);
      return;
    }
    
    console.log('Usuário admin criado com sucesso!');
    console.log('Email: admin@example.com');
    console.log('Senha: admin123');
    
    console.log('Banco de dados inicializado com sucesso!');
  } catch (error) {
    console.error('Erro ao inicializar banco de dados:', error);
  }
}

// Executar a função
initDatabase(); 