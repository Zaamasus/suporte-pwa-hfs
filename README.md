# 🚀 Sistema de Suporte Técnico - HFS INFORMATICA

Sistema completo de gestão de chamados técnicos com frontend React + TypeScript e backend Node.js + Express + Supabase.

## 🛠️ Tecnologias

### Frontend
- **React 18** + **TypeScript**
- **Vite** (build tool)
- **Tailwind CSS** (estilização)
- **React Router** (navegação)
- **React Query** (gerenciamento de estado)
- **React Hook Form** (formulários)
- **PWA** (Progressive Web App)

### Backend
- **Node.js** + **Express**
- **TypeScript**
- **Supabase** (banco de dados)
- **JWT** (autenticação)
- **Multer** (upload de arquivos)

## 🚀 Deploy no Render

### Configuração Rápida
1. **Fork/Clone** este repositório
2. **No Render Dashboard:**
   - **Dockerfile Path:** `Dockerfile.full`
   - **Docker Context:** `.`
   - **Port:** `80`

### Variáveis de Ambiente
```env
NODE_ENV=production
PORT=80
SUPABASE_URL=sua_url_do_supabase
SUPABASE_KEY=sua_chave_do_supabase
JWT_SECRET=seu_jwt_secret
```

## 🏃‍♂️ Desenvolvimento Local

### Pré-requisitos
- Node.js 18+
- npm ou yarn

### Instalação
```bash
# Instalar dependências do frontend
npm install

# Instalar dependências do backend
cd backend
npm install
cd ..
```

### Executar
```bash
# Frontend (porta 5173)
npm run dev

# Backend (porta 3000)
cd backend
npm run dev
```

### Build
```bash
# Build completo
npm run build

# Build sem TypeScript (mais rápido)
npm run build:skip-ts
```

## 📱 Funcionalidades

### 🔐 Autenticação
- Login/Registro de usuários
- JWT com refresh token
- Controle de acesso por roles

### 👥 Gestão de Clientes
- Cadastro e edição de clientes
- Agrupamento por empresas
- Histórico de tickets

### 🏢 Gestão de Empresas
- Cadastro de empresas
- Cores personalizadas
- Painel específico por empresa

### 🎫 Sistema de Tickets
- Criação e acompanhamento
- Prioridades (Baixa, Média, Alta, Crítica)
- Status (Aberto, Em Andamento, Resolvido, Fechado)
- Anexos de arquivos
- Comentários e histórico

### 👨‍💼 Painel de Técnicos
- Lista de técnicos disponíveis
- Atribuição de tickets
- Dashboard com estatísticas

### 🎨 Interface
- Tema escuro/claro
- Design responsivo
- PWA instalável
- Notificações toast

## 🔧 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev              # Frontend
npm run build            # Build completo
npm run build:skip-ts    # Build rápido
npm run preview          # Preview do build

# Docker
npm run docker:build     # Build da imagem
npm run docker:run       # Executar container
npm run docker:compose   # Docker Compose

# Deploy
npm run deploy           # Deploy no GitHub Pages
npm run render:deploy    # Build para Render
```

## 📁 Estrutura do Projeto

```
suporte-pwa-hfs/
├── src/                 # Frontend React
│   ├── components/      # Componentes reutilizáveis
│   ├── pages/          # Páginas da aplicação
│   ├── contexts/       # Contextos React
│   ├── utils/          # Utilitários
│   └── types/          # Tipos TypeScript
├── backend/            # Backend Node.js
│   ├── src/           # Código fonte
│   └── package.json   # Dependências
├── public/            # Arquivos estáticos
├── dist/              # Build do frontend
├── Dockerfile.full    # Docker para produção
└── nginx.conf         # Configuração do nginx
```

## 🐛 Debug

Acesse `/debug` na aplicação para:
- ✅ Testar conectividade com backend
- ✅ Verificar status da API
- ✅ Mostrar informações do ambiente
- ✅ Diagnosticar problemas

## 📞 Suporte

Para problemas ou dúvidas:
1. Verifique a página de debug (`/debug`)
2. Consulte os logs do Render
3. Abra uma issue no GitHub

---

**Desenvolvido por HFS INFORMATICA** 🚀 