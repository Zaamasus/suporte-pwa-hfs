import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createHashRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import axios from 'axios';
import App from './App';
import './index.css';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { ErrorFallback } from './components/common/ErrorFallback';

// Configurar a baseURL do Axios
// Em um app real, isso viria de uma variável de ambiente
if (import.meta.env.PROD) { // Se estiver em produção (build)
  axios.defaults.baseURL = 'http://localhost:4000'; // Ou a URL do seu backend de produção real
} else { // Em desenvolvimento
  axios.defaults.baseURL = 'http://localhost:4000'; // O backend roda na porta 4000 localmente
}

// Initialize mock service worker in development
async function prepareApp() {
  if (import.meta.env.DEV) {
    try {
      const { worker } = await import('./mocks/browser');
      await worker.start({
        onUnhandledRequest: 'bypass',
        serviceWorker: {
          url: '/mockServiceWorker.js'
        }
      });
    } catch (error) {
      console.warn('MSW initialization failed:', error);
    }
  }

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 1,
        refetchOnWindowFocus: false,
        staleTime: 5 * 60 * 1000, // 5 minutes
      },
    },
  });

  // Configuração das rotas para createHashRouter com errorElement global
  const router = createHashRouter([
    {
      path: "/*",
      element: <App />,
      errorElement: <ErrorFallback />, // Adiciona tratamento de erro global
    }
  ]);

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <AuthProvider>
            <RouterProvider router={router} />
          </AuthProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </StrictMode>
  );
}

prepareApp();