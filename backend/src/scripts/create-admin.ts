import { supabase } from '../config';
import bcrypt from 'bcryptjs';
import { config } from '../config';

async function createAdminUser() {
  try {
    // Verificar se o usuário já existe
    const { data: existingUser, error: checkError } = await supabase
      .from('users')
      .select('*')
      .eq('email', 'admin@example.com')
      .single();
    
    if (checkError && checkError.code !== 'PGRST116') {
      console.error('Erro ao verificar usuário existente:', checkError);
      return;
    }
    
    if (existingUser) {
      console.log('O usuário admin já existe!');
      return;
    }
    
    // Criptografar a senha
    const salt = await bcrypt.genSalt(config.security.bcryptSaltRounds);
    const hashedPassword = await bcrypt.hash('admin123', salt);
    
    // Criar o usuário admin
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
    
  } catch (error) {
    console.error('Erro ao criar usuário admin:', error);
  }
}

// Executar a função
createAdminUser(); 