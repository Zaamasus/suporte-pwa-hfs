import { supabase } from '../config';

async function testConnection() {
  console.log('Testando conexão com o Supabase...');
  
  try {
    const { data, error } = await supabase.from('users').select('*');
    
    if (error) {
      console.error('Erro na conexão:', error);
    } else {
      console.log('Conexão bem-sucedida!');
      console.log(`Encontrados ${data?.length || 0} usuários:`);
      data?.forEach(user => {
        console.log(`- ${user.name} (${user.email}): ${user.role}`);
      });
    }
  } catch (err) {
    console.error('Erro inesperado:', err);
  }
}

testConnection(); 