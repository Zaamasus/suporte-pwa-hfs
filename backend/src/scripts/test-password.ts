import { supabase } from '../config';
import bcrypt from 'bcryptjs';

// Senha de teste
const testPassword = 'senha123';

async function testUserPassword() {
  try {
    console.log('Testando validação de senha...');
    
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
      role: user.role,
      password: user.password ? `${user.password.substring(0, 15)}...` : 'não disponível'
    });
    
    // Testar validação de senha
    try {
      const isValid = await bcrypt.compare(testPassword, user.password);
      console.log(`A senha '${testPassword}' é ${isValid ? 'válida' : 'inválida'} para este usuário.`);
      
      // Se a senha for inválida, vamos criar um hash da senha correta para atualizar
      if (!isValid) {
        console.log('Gerando novo hash para a senha...');
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(testPassword, salt);
        console.log('Novo hash gerado:', hashedPassword);
        
        // Atualizar a senha do usuário
        console.log('Atualizando senha do usuário...');
        const { data: updateResult, error: updateError } = await supabase
          .from('users')
          .update({ password: hashedPassword })
          .eq('id', user.id)
          .select();
        
        if (updateError) {
          console.error('Erro ao atualizar senha:', updateError);
        } else {
          console.log('Senha atualizada com sucesso!');
        }
      }
    } catch (err) {
      console.error('Erro ao validar senha:', err);
    }
  } catch (error) {
    console.error('Erro no teste de senha:', error);
  }
}

testUserPassword(); 