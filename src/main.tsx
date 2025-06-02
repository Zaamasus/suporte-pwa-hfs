import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createHashRouter, createBrowserRouter } from 'react-router-dom';
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
  axios.defaults.baseURL = 'https://hfs-backend.onrender.com'; // URL do backend no Render.com
} else { // Em desenvolvimento
  axios.defaults.baseURL = 'http://localhost:3000'; // O backend roda na porta 3000 localmente
  console.log('Conectando ao backend em:', axios.defaults.baseURL);
}

async function prepareApp() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 1,
        refetchOnWindowFocus: false,
        staleTime: 5 * 60 * 1000, // 5 minutes
      },
    },
  });

  // Escolher o router apropriado para o ambiente
  // Em produção (GitHub Pages): usar createHashRouter para compatibilidade com hospedagem estática
  // Em desenvolvimento: usar createBrowserRouter para URLs mais limpas
  const createRouter = import.meta.env.PROD ? createHashRouter : createBrowserRouter;
  
  const router = createRouter([
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