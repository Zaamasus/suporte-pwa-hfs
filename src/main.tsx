import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import axios from 'axios';
import App from './App';
import './index.css';
import { AuthProvider } from './contexts/AuthContext';

// Configurar a baseURL do Axios
// Em um app real, isso viria de uma variável de ambiente
if (import.meta.env.PROD) { // Se estiver em produção (build)
  axios.defaults.baseURL = 'https://hfs-backend.onrender.com'; // URL do backend no Render.com
} else { // Em desenvolvimento
  axios.defaults.baseURL = 'http://localhost:3000'; // URL do backend em desenvolvimento
  console.log('Conectando ao backend em:', axios.defaults.baseURL);
}

// Renderiza a aplicação
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>
);