# Projeto de Sistema de Suporte Técnico

Este é um projeto full-stack com frontend em React e backend em Node.js separados em pastas distintas.

## Estrutura do Projeto

```
projeto/
  ├── frontend/ (pasta raiz)
  │   ├── src/
  │   │   ├── components/
  │   │   ├── pages/
  │   │   ├── contexts/
  │   │   ├── utils/
  │   │   ├── App.tsx
  │   │   └── main.tsx
  │   ├── public/
  │   ├── package.json
  │   └── vite.config.ts
  │
  ├── backend/
  │   ├── src/
  │   │   ├── config/
  │   │   ├── controllers/
  │   │   ├── middlewares/
  │   │   ├── models/
  │   │   ├── routes/
  │   │   ├── services/
  │   │   └── index.ts
  │   ├── package.json
  │   └── tsconfig.json
  │
  ├── start-server.bat (inicia apenas o backend)
  ├── start-project.bat (inicia backend e frontend)
  └── reorganize-project.bat (limpa estrutura duplicada)
```

## Como Executar

### Projeto Completo (Frontend + Backend)

```bash
# Execute o script batch (Windows)
start-project.bat
```

### Frontend Separadamente

```bash
# Na pasta raiz do projeto
npm run dev
```

### Backend Separadamente

```bash
# Execute o script batch (Windows)
start-server.bat

# Ou diretamente
cd backend
npm run dev
```

## Endereços

- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:3000
- **API**: http://localhost:3000/api

## Tecnologias Utilizadas

### Frontend
- React
- TypeScript
- Vite
- Tailwind CSS

### Backend
- Node.js
- Express
- TypeScript
- Supabase (Banco de dados) 