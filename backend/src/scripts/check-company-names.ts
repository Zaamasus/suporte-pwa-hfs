import { supabase } from '../config/supabase';

async function checkCompanyNames() {
  try {
    const { data, error } = await supabase
      .from('companies')
      .select('id, name');

    if (error) {
      console.error('Erro ao buscar empresas:', error);
      return;
    }

    console.log('\nEmpresas encontradas:');
    data.forEach(company => {
      console.log(`- ${company.name} (ID: ${company.id})`);
    });
  } catch (error) {
    console.error('Erro ao verificar empresas:', error);
  }
}

// Executar a função
checkCompanyNames(); 