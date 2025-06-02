import { supabase } from '../config';
import bcrypt from 'bcryptjs';

// Senha padrão para redefinição
const defaultPassword = 'senha123';

async function fixAllPasswords() {
  try {
    console.log('Iniciando correção de todas as senhas...');
    
    // Buscar todos os usuários
    const { data: users, error } = await supabase
      .from('users')
      .select('*');
    
    if (error) {
      console.error('Erro ao buscar usuários:', error);
      return;
    }
    
    console.log(`Encontrados ${users.length} usuários para atualizar`);
    
    // Gerar nova senha hasheada
    console.log(`Gerando hash para a senha '${defaultPassword}'...`);
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(defaultPassword, salt);
    console.log('Hash gerado:', hashedPassword);
    
    // Atualizar a senha de cada usuário
    for (const user of users) {
      console.log(`Atualizando senha do usuário ${user.name} (${user.email})...`);
      
      const { data, error: updateError } = await supabase
        .from('users')
        .update({ password: hashedPassword })
        .eq('id', user.id);
      
      if (updateError) {
        console.error(`Erro ao atualizar senha do usuário ${user.email}:`, updateError);
      } else {
        console.log(`Senha do usuário ${user.email} atualizada com sucesso!`);
      }
    }
    
    console.log('Processo de atualização de senhas concluído!');
    console.log('Todos os usuários agora têm a senha:', defaultPassword);
    
  } catch (error) {
    console.error('Erro ao corrigir senhas:', error);
  }
}

fixAllPasswords(); 