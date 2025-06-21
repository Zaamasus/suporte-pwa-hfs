# 🚀 Sistema de Suporte Técnico HFS

Sistema completo de gestão de chamados técnicos com frontend React + TypeScript e backend Node.js + Supabase.

## ✨ Funcionalidades

- 🔐 **Autenticação** com JWT
- 👥 **Gestão de Clientes** e Empresas
- 🎫 **Sistema de Tickets** com prioridades
- 👨‍💻 **Painel de Técnicos** com WhatsApp direto
- 📊 **Dashboard** com métricas
- 🌙 **Tema Escuro/Claro**
- 📱 **PWA** (Progressive Web App)

## 🏗️ Estrutura do Projeto

```
src/
├── components/          # Componentes React
│   ├── auth/           # Componentes de autenticação
│   ├── clients/        # Componentes de clientes
│   ├── common/         # Componentes comuns
│   ├── layout/         # Componentes de layout
│   ├── tickets/        # Componentes de tickets
│   └── ui/             # Componentes de UI
├── contexts/           # Contextos React
├── pages/              # Páginas da aplicação
├── services/           # Serviços de API
├── types/              # Tipos TypeScript
├── utils/              # Utilitários
└── main.tsx           # Ponto de entrada
```

## 🚀 Deploy

### Render (Recomendado)

1. **Acesse [render.com](https://render.com)**
2. **Crie um Web Service**
3. **Conecte o repositório GitHub**
4. **Configure:**
   - **Dockerfile Path**: `Dockerfile.full`
   - **Docker Context**: `.`
5. **Variáveis de Ambiente:**
   ```
   NODE_ENV=production
   PORT=80
   SUPABASE_URL=sua_url_do_supabase
   SUPABASE_KEY=sua_chave_do_supabase
   ```

### URLs Finais
- **Aplicação**: `https://suporte-hfs.onrender.com`
- **API**: `https://suporte-hfs.onrender.com/api`

## 🛠️ Desenvolvimento

### Instalar Dependências
```bash
npm install
```

### Executar em Desenvolvimento
```bash
npm run dev
```

### Build para Produção
```bash
npm run build
```

### Build sem TypeScript (para deploy)
```bash
npm run build:skip-ts
```

## 📦 Scripts Disponíveis

- `npm run dev` - Desenvolvimento
- `npm run build` - Build com TypeScript
- `npm run build:skip-ts` - Build sem TypeScript
- `npm run lint` - Linter
- `npm run preview` - Preview do build
- `npm run docker:build` - Build Docker
- `npm run docker:run` - Executar Docker
- `npm run docker:compose` - Docker Compose

## 🔧 Tecnologias

### Frontend
- **React 18** + **TypeScript**
- **Vite** - Build tool
- **Tailwind CSS** - Estilização
- **React Router** - Roteamento
- **React Query** - Gerenciamento de estado
- **React Hook Form** - Formulários
- **Zod** - Validação
- **Lucide React** - Ícones

### Backend
- **Node.js** + **Express**
- **Supabase** - Banco de dados
- **JWT** - Autenticação
- **CORS** - Cross-origin

### Deploy
- **Docker** - Containerização
- **Nginx** - Proxy reverso
- **Render** - Hospedagem

## 📁 Arquivos de Configuração

- `Dockerfile.full` - Aplicação completa
- `nginx.conf` - Configuração do Nginx
- `vite.config.ts` - Configuração do Vite
- `tailwind.config.js` - Configuração do Tailwind
- `tsconfig.json` - Configuração do TypeScript

## 🎯 Status do Projeto

- ✅ **Refatoração completa** realizada
- ✅ **Código limpo** e organizado
- ✅ **Dependências otimizadas**
- ✅ **Deploy configurado**
- ✅ **PWA funcionando**

---

**Desenvolvido para HFS Informática** 🚀 