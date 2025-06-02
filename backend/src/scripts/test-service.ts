import { supabase } from '../config';

// Função que imita o método getAllTickets, mas com mais logs para depuração
async function debugGetAllTickets(params: any) {
  console.log('Iniciando debugGetAllTickets com params:', params);
  
  try {
    let query = supabase.from('tickets').select('*');
    console.log('Query básica criada');
    
    // Filtrar por status, se fornecido
    if (params.status) {
      console.log(`Aplicando filtro de status: ${params.status}`);
      query = query.eq('status', params.status);
    }
    
    // Lógica de filtro baseada no papel do usuário
    if (params.userRole === 'client') {
      if (params.company) {
        console.log(`Filtrando por empresa: ${params.company}`);
        query = query.eq('company', params.company);
      } else {
        console.log(`Filtrando por client_id: ${params.userId}`);
        query = query.eq('client_id', params.userId);
      }
    } else {
      console.log(`Usuário é ${params.userRole}, não aplicando filtro de cliente`);
    }
    
    if (params.sortBy === 'newest') {
      console.log('Ordenando por mais recentes');
      query = query.order('created_at', { ascending: false });
    } else {
      console.log(`Ordenando por ${params.sortBy || 'padrão (mais recentes)'}`);
      query = query.order('created_at', { ascending: false });
    }
    
    console.log('Executando query...');
    const { data, error } = await query;
    
    if (error) {
      console.error('ERRO ao executar query:', error);
      throw new Error(`Erro ao buscar tickets: ${error.message}`);
    }
    
    console.log(`Query executada com sucesso. Encontrados ${data?.length || 0} tickets`);
    
    if (data && data.length > 0) {
      console.log('Primeiro resultado:', data[0]);
    }
    
    return data || [];
  } catch (error) {
    console.error('ERRO CRÍTICO:', error);
    throw error;
  }
}

async function testService() {
  try {
    // Parâmetros de teste
    const testParams = {
      userId: 'c6d75c42-9511-4d35-aeab-48709911b4da',
      userRole: 'client',
      status: undefined,
      priority: undefined,
      search: undefined,
      sortBy: 'newest'
    };
    
    console.log('Executando teste com parâmetros:', testParams);
    const tickets = await debugGetAllTickets(testParams);
    
    console.log(`Teste concluído. Retornados ${tickets.length} tickets`);
  } catch (error) {
    console.error('Erro no teste:', error);
  }
}

testService(); 