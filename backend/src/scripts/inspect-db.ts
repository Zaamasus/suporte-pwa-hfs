import { supabase } from '../config';

async function inspectDatabase() {
  try {
    console.log('Inspecionando banco de dados Supabase...');
    
    // Verificar tabela de tickets
    console.log('\n== TABELA TICKETS ==');
    const { data: tickets, error: ticketsError } = await supabase
      .from('tickets')
      .select('*')
      .limit(1);
    
    if (ticketsError) {
      console.error('Erro ao acessar tabela tickets:', ticketsError);
    } else if (tickets && tickets.length > 0) {
      console.log('Estrutura da tabela tickets:');
      const columns = Object.keys(tickets[0]);
      columns.forEach(col => console.log(`- ${col}`));
      
      console.log('\nExemplo de ticket:');
      console.log(JSON.stringify(tickets[0], null, 2));
    } else {
      console.log('A tabela tickets está vazia');
    }
    
    // Verificar tabela de usuários
    console.log('\n== TABELA USERS ==');
    const { data: users, error: usersError } = await supabase
      .from('users')
      .select('*')
      .limit(1);
    
    if (usersError) {
      console.error('Erro ao acessar tabela users:', usersError);
    } else if (users && users.length > 0) {
      console.log('Estrutura da tabela users:');
      const columns = Object.keys(users[0]);
      columns.forEach(col => console.log(`- ${col}`));
      
      console.log('\nExemplo de usuário:');
      const userExample = {...users[0]};
      if (userExample.password) {
        userExample.password = '************';
      }
      console.log(JSON.stringify(userExample, null, 2));
    } else {
      console.log('A tabela users está vazia');
    }
    
    // Verificar tabela de empresas
    console.log('\n== TABELA COMPANIES ==');
    const { data: companies, error: companiesError } = await supabase
      .from('companies')
      .select('*')
      .limit(1);
    
    if (companiesError) {
      console.error('Erro ao acessar tabela companies:', companiesError);
    } else if (companies && companies.length > 0) {
      console.log('Estrutura da tabela companies:');
      const columns = Object.keys(companies[0]);
      columns.forEach(col => console.log(`- ${col}`));
      
      console.log('\nExemplo de empresa:');
      console.log(JSON.stringify(companies[0], null, 2));
    } else {
      console.log('A tabela companies está vazia');
    }
  } catch (error) {
    console.error('Erro ao inspecionar banco de dados:', error);
  }
}

inspectDatabase(); 