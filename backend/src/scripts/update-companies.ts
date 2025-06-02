import { supabase } from '../config/supabase';

async function updateCompanies() {
  try {
    // Primeiro, vamos verificar se as empresas existem
    const { data: alvoTech, error: alvoTechError } = await supabase
      .from('companies')
      .select('id, name')
      .eq('name', 'AlvoTech')
      .single();

    if (alvoTechError) {
      console.error('Erro ao buscar AlvoTech:', alvoTechError);
    }

    const { data: neotron, error: neotronError } = await supabase
      .from('companies')
      .select('id, name')
      .eq('name', 'Neotron')
      .single();

    if (neotronError) {
      console.error('Erro ao buscar Neotron:', neotronError);
    }

    // Atualizar AlvoTech para Alvo Segurança
    if (alvoTech) {
      const { data: alvoData, error: alvoError } = await supabase
        .from('companies')
        .update({ name: 'Alvo Segurança' })
        .eq('id', alvoTech.id)
        .select();

      if (alvoError) {
        console.error('Erro ao atualizar AlvoTech:', alvoError);
      } else {
        console.log('AlvoTech atualizado para Alvo Segurança:', alvoData);
      }
    } else {
      console.log('Empresa AlvoTech não encontrada');
    }

    // Atualizar Neotron para Anjos da Guarda
    if (neotron) {
      const { data: neutronData, error: neutronError } = await supabase
        .from('companies')
        .update({ name: 'Anjos da Guarda' })
        .eq('id', neotron.id)
        .select();

      if (neutronError) {
        console.error('Erro ao atualizar Neotron:', neutronError);
      } else {
        console.log('Neotron atualizado para Anjos da Guarda:', neutronData);
      }
    } else {
      console.log('Empresa Neotron não encontrada');
    }

    console.log('Atualização de empresas concluída!');
  } catch (error) {
    console.error('Erro ao atualizar empresas:', error);
  }
}

// Executar a função
updateCompanies(); 