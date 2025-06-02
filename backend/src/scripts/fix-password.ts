import { supabase } from '../config';
import bcrypt from 'bcryptjs';

// Senha de teste
const testPassword = 'senha123';

async function fixPassword() {
  try {
    console.log('Iniciando correção de senha...');
    
    // Buscar usuário por email
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', 'roberta@alvotech.com')
      .single();
    
    if (error) {
      console.error('Erro ao buscar usuário:', error);
      return;
    }
    
    if (!user) {
      console.log('Usuário não encontrado');
      return;
    }
    
    console.log('Usuário encontrado:', {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    });
    
    // Gerar nova senha hasheada
    console.log(`Gerando hash para a senha '${testPassword}'...`);
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(testPassword, salt);
    console.log('Hash gerado:', hashedPassword);
    
    // Atualizar a senha do usuário
    console.log('Atualizando senha do usuário...');
    const { data: updateResult, error: updateError } = await supabase
      .from('users')
      .update({ password: hashedPassword })
      .eq('id', user.id);
    
    if (updateError) {
      console.error('Erro ao atualizar senha:', updateError);
    } else {
      console.log('Senha atualizada com sucesso!');
      
      // Verificar se a atualização funcionou
      const { data: updatedUser, error: checkError } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();
      
      if (checkError) {
        console.error('Erro ao verificar atualização:', checkError);
      } else {
        console.log('Nova senha armazenada:', updatedUser.password);
      }
    }
  } catch (error) {
    console.error('Erro ao corrigir senha:', error);
  }
}

fixPassword(); 