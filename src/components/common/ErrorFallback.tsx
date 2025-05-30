import { useNavigate, isRouteErrorResponse, useRouteError } from 'react-router-dom';
import { Button } from '../ui/Button';
import { Layout } from '../layout/Layout';
import { useEffect } from 'react';

export function ErrorFallback() {
  const error = useRouteError();
  const navigate = useNavigate();

  // Log do erro para debug
  useEffect(() => {
    console.error('Erro na aplicação:', error);
  }, [error]);

  // Determinar título e mensagem com base no tipo de erro
  let title = 'Ocorreu um erro inesperado';
  let message = 'Houve um problema ao processar sua solicitação. Por favor, tente novamente.';

  if (isRouteErrorResponse(error)) {
    // Erros de rota específicos do React Router
    if (error.status === 404) {
      title = 'Página não encontrada';
      message = 'A página que você está procurando não existe ou foi movida.';
    } else if (error.status === 403) {
      title = 'Acesso negado';
      message = 'Você não tem permissão para acessar esta página.';
    } else if (error.status === 401) {
      title = 'Não autorizado';
      message = 'Você precisa fazer login para acessar esta página.';
    }
  } else if (error instanceof Error) {
    // Erros Javascript normais
    message = `Detalhes do erro: ${error.message}`;
  }

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
        <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-full mb-6">
          <svg 
            className="w-16 h-16 text-red-500 dark:text-red-400" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
            />
          </svg>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          {title}
        </h1>
        
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-md">
          {message}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Button 
            onClick={() => navigate(-1)}
            variant="outline"
          >
            Voltar
          </Button>
          
          <Button 
            onClick={() => navigate('/', { replace: true })}
          >
            Ir para o Dashboard
          </Button>
        </div>
      </div>
    </Layout>
  );
} 