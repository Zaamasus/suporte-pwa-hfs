import { useState, useEffect } from 'react';
import { healthCheck, testApiConnection } from '../utils/healthCheck';
import axios from 'axios';

export function Debug() {
  const [healthStatus, setHealthStatus] = useState<string>('Verificando...');
  const [apiStatus, setApiStatus] = useState<string>('Verificando...');
  const [environment, setEnvironment] = useState<string>('');
  const [baseUrl, setBaseUrl] = useState<string>('');

  useEffect(() => {
    // Informações do ambiente
    setEnvironment(import.meta.env.MODE);
    setBaseUrl(axios.defaults.baseURL || 'Não configurado');

    // Testes de conectividade
    const runTests = async () => {
      // Teste do health endpoint
      try {
        const healthOk = await healthCheck();
        setHealthStatus(healthOk ? '✅ Conectado' : '❌ Falha na conexão');
      } catch (error) {
        setHealthStatus('❌ Erro no teste');
      }

      // Teste da API
      try {
        const apiOk = await testApiConnection();
        setApiStatus(apiOk ? '✅ Conectado' : '❌ Falha na conexão');
      } catch (error) {
        setApiStatus('❌ Erro no teste');
      }
    };

    runTests();
  }, []);

  const handleRetest = async () => {
    setHealthStatus('Verificando...');
    setApiStatus('Verificando...');
    
    setTimeout(async () => {
      const healthOk = await healthCheck();
      const apiOk = await testApiConnection();
      
      setHealthStatus(healthOk ? '✅ Conectado' : '❌ Falha na conexão');
      setApiStatus(apiOk ? '✅ Conectado' : '❌ Falha na conexão');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            🔧 Debug - Sistema de Suporte
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                🌍 Ambiente
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                <strong>Modo:</strong> {environment}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                <strong>Base URL:</strong> {baseUrl}
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                🔗 Conectividade
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                <strong>Health Check:</strong> {healthStatus}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                <strong>API:</strong> {apiStatus}
              </p>
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
              📋 Informações Importantes
            </h3>
            <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
              <li>• Se ambos os testes falharem, o backend não está rodando</li>
              <li>• Verifique se está usando o Dockerfile.full no Render</li>
              <li>• Confirme se as variáveis de ambiente estão corretas</li>
              <li>• Os erros do Chrome Extension não afetam a aplicação</li>
            </ul>
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleRetest}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              🔄 Testar Novamente
            </button>
            
            <button
              onClick={() => window.open('https://suporte-pwa-hfs-1.onrender.com/health', '_blank')}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              🌐 Abrir Health Check
            </button>
          </div>

          <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-700 rounded-lg">
            <h3 className="font-semibold text-yellow-900 dark:text-yellow-100 mb-2">
              ⚠️ Erros do Chrome Extension
            </h3>
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              Os erros relacionados ao "pinComponent.js" são de uma extensão do Chrome 
              (PIN Company Discounts) e não afetam o funcionamento da sua aplicação. 
              Você pode ignorar esses erros ou desabilitar a extensão.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 