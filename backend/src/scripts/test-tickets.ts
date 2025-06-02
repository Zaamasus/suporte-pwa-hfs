import { supabase } from '../config';

async function testTicketsTable() {
  try {
    console.log('Testando acesso direto à tabela de tickets...');
    
    // Consulta básica
    const { data, error } = await supabase
      .from('tickets')
      .select('*')
      .limit(3);
    
    if (error) {
      console.error('Erro ao consultar tickets:', error);
      return;
    }
    
    console.log(`Encontrados ${data?.length || 0} tickets`);
    
    if (data && data.length > 0) {
      console.log('Exemplo do primeiro ticket:');
      console.log(JSON.stringify(data[0], null, 2));
      
      // Listar todas as colunas
      console.log('Colunas da tabela tickets:');
      console.log(Object.keys(data[0]));
    }
    
    // Teste de filtro específico
    console.log('\nTestando filtro por cliente...');
    const { data: filteredData, error: filterError } = await supabase
      .from('tickets')
      .select('*')
      .eq('client_id', 'c6d75c42-9511-4d35-aeab-48709911b4da')
      .limit(3);
      
    if (filterError) {
      console.error('Erro ao filtrar tickets:', filterError);
    } else {
      console.log(`Encontrados ${filteredData?.length || 0} tickets para o cliente`);
    }
  } catch (error) {
    console.error('Erro ao testar tabela de tickets:', error);
  }
}

testTicketsTable(); 