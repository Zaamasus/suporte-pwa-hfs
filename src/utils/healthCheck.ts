import axios from 'axios';

export const healthCheck = async () => {
  try {
    console.log('🔍 Verificando saúde do backend...');
    console.log('URL base:', axios.defaults.baseURL);
    
    const response = await axios.get('/health', {
      timeout: 5000,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    console.log('✅ Backend respondendo:', response.status);
    console.log('📊 Dados:', response.data);
    return true;
  } catch (error) {
    console.error('❌ Erro ao conectar com backend:', error);
    
    if (axios.isAxiosError(error)) {
      console.error('📋 Detalhes do erro:', {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        message: error.message
      });
    }
    
    return false;
  }
};

export const testApiConnection = async () => {
  try {
    console.log('🔍 Testando conexão com API...');
    
    const response = await axios.get('/api/health', {
      timeout: 5000
    });
    
    console.log('✅ API respondendo:', response.status);
    return true;
  } catch (error) {
    console.error('❌ Erro na API:', error);
    return false;
  }
}; 