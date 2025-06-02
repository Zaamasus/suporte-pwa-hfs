import { createClient } from '@supabase/supabase-js';
import { config } from './config';

// Credenciais do Supabase
const supabaseUrl = config.supabase.url;
const supabaseKey = config.supabase.key;

// Verifica se as credenciais estão definidas
if (!supabaseUrl || !supabaseKey) {
  console.warn(
    'Aviso: Credenciais do Supabase não estão devidamente configuradas. ' +
    'Verifique o arquivo .env e as configurações.'
  );
}

// Cria e exporta o cliente do Supabase
export const supabase = createClient(supabaseUrl, supabaseKey);

// Função para testar a conexão
export const testConnection = async (): Promise<boolean> => {
  try {
    const { data, error } = await supabase.from('users').select('count').limit(1);
    
    if (error) {
      console.error('Erro ao testar conexão com o Supabase:', error);
      return false;
    }
    
    console.log('Conexão com o Supabase estabelecida com sucesso!');
    return true;
  } catch (error) {
    console.error('Erro ao testar conexão com o Supabase:', error);
    return false;
  }
}; 