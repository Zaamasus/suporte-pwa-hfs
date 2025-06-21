# Deploy no Render - Sistema de Suporte HFS

Este guia explica como fazer o deploy do sistema completo (frontend + backend) no Render.

## Opções de Deploy

### Opção 1: Deploy como Aplicação Única (Recomendado)

Esta opção coloca frontend e backend na mesma aplicação, facilitando o gerenciamento.

#### Passos:

1. **Criar nova aplicação no Render**
   - Acesse [render.com](https://render.com)
   - Clique em "New +" → "Web Service"
   - Conecte seu repositório GitHub

2. **Configurar a aplicação**
   - **Name**: `suporte-hfs`
   - **Environment**: `Docker`
   - **Region**: Escolha a mais próxima
   - **Branch**: `main`
   - **Dockerfile Path**: `Dockerfile.full`
   - **Docker Context**: `.`

3. **Variáveis de Ambiente**
   Configure as seguintes variáveis:
   ```
   NODE_ENV=production
   PORT=80
   SUPABASE_URL=sua_url_do_supabase
   SUPABASE_KEY=sua_chave_do_supabase
   JWT_SECRET=seu_jwt_secret_seguro
   ```

4. **Deploy**
   - Clique em "Create Web Service"
   - Aguarde o build e deploy

### Opção 2: Deploy Separado (Frontend + Backend)

Esta opção cria duas aplicações separadas.

#### Backend:

1. **Criar Web Service para Backend**
   - **Name**: `suporte-backend`
   - **Environment**: `Node`
   - **Build Command**: `cd backend && npm install && npm run build`
   - **Start Command**: `cd backend && npm start`

2. **Variáveis de Ambiente do Backend**
   ```
   NODE_ENV=production
   PORT=3000
   SUPABASE_URL=sua_url_do_supabase
   SUPABASE_KEY=sua_chave_do_supabase
   JWT_SECRET=seu_jwt_secret_seguro
   ```

#### Frontend:

1. **Criar Static Site para Frontend**
   - **Name**: `suporte-frontend`
   - **Environment**: `Static Site`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`

2. **Variáveis de Ambiente do Frontend**
   ```
   VITE_API_URL=https://suporte-backend.onrender.com
   ```

## Configuração do Supabase

1. **Criar projeto no Supabase**
   - Acesse [supabase.com](https://supabase.com)
   - Crie um novo projeto

2. **Configurar banco de dados**
   - Execute os scripts SQL necessários
   - Configure as políticas de segurança

3. **Obter credenciais**
   - Copie a URL e chave anon do projeto
   - Configure nas variáveis de ambiente

## URLs Finais

### Opção 1 (Aplicação Única):
- **Aplicação**: `https://suporte-hfs.onrender.com`

### Opção 2 (Separado):
- **Backend**: `https://suporte-backend.onrender.com`
- **Frontend**: `https://suporte-frontend.onrender.com`

## Monitoramento

- **Logs**: Acesse a aba "Logs" no Render
- **Health Check**: `/health` endpoint disponível
- **Métricas**: Disponível na aba "Metrics"

## Troubleshooting

### Problemas Comuns:

1. **Build falha**
   - Verifique se todas as dependências estão no package.json
   - Confirme se os scripts de build estão corretos

2. **CORS errors**
   - O nginx já está configurado para resolver problemas de CORS
   - Verifique se as URLs estão corretas

3. **Banco de dados não conecta**
   - Verifique as credenciais do Supabase
   - Confirme se as políticas de segurança estão configuradas

4. **Aplicação não inicia**
   - Verifique os logs no Render
   - Confirme se a porta está correta (80 para aplicação única)

## Comandos Úteis

### Teste Local com Docker:
```bash
# Build da imagem
docker build -f Dockerfile.full -t suporte-hfs .

# Executar localmente
docker run -p 80:80 -e SUPABASE_URL=sua_url -e SUPABASE_KEY=sua_chave -e JWT_SECRET=seu_secret suporte-hfs
```

### Teste com Docker Compose:
```bash
docker-compose up --build
```

## Segurança

- Use JWT_SECRET forte e único
- Configure políticas de segurança no Supabase
- Mantenha as dependências atualizadas
- Use HTTPS em produção (Render fornece automaticamente) 