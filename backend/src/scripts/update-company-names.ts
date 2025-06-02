import { supabase } from '../config/supabase';

async function updateCompanyNames() {
  try {
    // Atualizar AlvoTech para Alvo Segurança
    const { data: alvoUsers, error: alvoUsersError } = await supabase
      .from('users')
      .update({ company: 'Alvo Segurança' })
      .eq('company', 'AlvoTech')
      .select();

    if (alvoUsersError) {
      console.error('Erro ao atualizar usuários da AlvoTech:', alvoUsersError);
    } else {
      console.log('Usuários da AlvoTech atualizados:', alvoUsers);
    }

    const { data: alvoTickets, error: alvoTicketsError } = await supabase
      .from('tickets')
      .update({ company: 'Alvo Segurança' })
      .eq('company', 'AlvoTech')
      .select();

    if (alvoTicketsError) {
      console.error('Erro ao atualizar tickets da AlvoTech:', alvoTicketsError);
    } else {
      console.log('Tickets da AlvoTech atualizados:', alvoTickets);
    }

    // Atualizar Neotron para Anjos da Guarda
    const { data: neutronUsers, error: neutronUsersError } = await supabase
      .from('users')
      .update({ company: 'Anjos da Guarda' })
      .eq('company', 'Neotron')
      .select();

    if (neutronUsersError) {
      console.error('Erro ao atualizar usuários da Neotron:', neutronUsersError);
    } else {
      console.log('Usuários da Neotron atualizados:', neutronUsers);
    }

    const { data: neutronTickets, error: neutronTicketsError } = await supabase
      .from('tickets')
      .update({ company: 'Anjos da Guarda' })
      .eq('company', 'Neotron')
      .select();

    if (neutronTicketsError) {
      console.error('Erro ao atualizar tickets da Neotron:', neutronTicketsError);
    } else {
      console.log('Tickets da Neotron atualizados:', neutronTickets);
    }

    console.log('Atualização de nomes concluída!');
  } catch (error) {
    console.error('Erro ao atualizar nomes:', error);
  }
}

// Executar a função
updateCompanyNames(); 