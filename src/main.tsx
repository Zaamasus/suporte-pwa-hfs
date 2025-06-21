import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import axios from 'axios';
import App from './App';
import './index.css';
import { AuthProvider } from './contexts/AuthContext';
import { HashRouter } from 'react-router-dom';
import ErrorBoundary from './components/common/ErrorBoundary';

// Configurar a baseURL do Axios
if (import.meta.env.PROD) { // Se estiver em produção (build)
  // Na aplicação completa, o backend estará na mesma URL, apenas em /api
  axios.defaults.baseURL = window.location.origin;
} else { // Em desenvolvimento
  axios.defaults.baseURL = 'http://localhost:3000'; // URL do backend em desenvolvimento
  console.log('Conectando ao backend em:', axios.defaults.baseURL);
}

// Renderiza a aplicação
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <HashRouter>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>       
      </HashRouter>
    </AuthProvider>
  </StrictMode>
);