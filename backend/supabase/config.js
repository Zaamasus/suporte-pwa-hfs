require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

// Estas variáveis devem ser definidas no arquivo .env
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

// Verificação de segurança
if (!supabaseUrl || !supabaseKey) {
  console.error('⚠️ As credenciais do Supabase não foram configuradas no arquivo .env');
  console.error('Por favor, crie um arquivo .env com as variáveis SUPABASE_URL e SUPABASE_KEY');
  process.exit(1);
}

// Criação do cliente Supabase
const supabase = createClient(supabaseUrl, supabaseKey);

// Função de teste de conexão
async function testConnection() {
  try {
    const { data, error } = await supabase.from('users').select('count').limit(1);
    if (error) throw error;
    console.log('✅ Conexão com Supabase estabelecida com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao conectar com o Supabase:', error.message);
    console.log('Verifique as credenciais e se as tabelas foram criadas corretamente.');
  }
}

module.exports = {
  supabase,
  testConnection
}; 