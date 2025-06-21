# 🚀 Deploy Completo no Render - Frontend + Backend

## ✅ Configuração para Aplicação Única

Este guia mostra como fazer deploy do sistema completo (frontend + backend) em uma única aplicação no Render.

## 📋 Passos para Deploy

### 1. Preparar o Repositório
- ✅ Todos os arquivos já estão configurados
- ✅ Dockerfile.full criado
- ✅ nginx.conf configurado
- ✅ start.sh criado

### 2. Criar Aplicação no Render

1. **Acesse [render.com](https://render.com)**
2. **Faça login e clique em "New +"**
3. **Selecione "Web Service"**
4. **Conecte seu repositório GitHub**

### 3. Configurar a Aplicação

**Configurações básicas:**
- **Name**: `suporte-hfs` (ou o nome que preferir)
- **Environment**: `Docker`
- **Region**: Escolha a mais próxima (ex: US East)
- **Branch**: `main`
- **Dockerfile Path**: `Dockerfile.full`
- **Docker Context**: `.`

### 4. Variáveis de Ambiente

Configure as seguintes variáveis:

```
NODE_ENV=production
PORT=80
SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_KEY=sua_chave_anon_do_supabase
JWT_SECRET=seu_jwt_secret_super_seguro_aqui
```

**Como obter as credenciais do Supabase:**
1. Acesse [supabase.com](https://supabase.com)
2. Vá no seu projeto
3. Settings → API
4. Copie a URL e a chave anon

### 5. Deploy

1. **Clique em "Create Web Service"**
2. **Aguarde o build** (pode demorar alguns minutos)
3. **A aplicação ficará disponível em**: `https://suporte-hfs.onrender.com`

## 🔧 Como Funciona

### Estrutura da Aplicação:
```
┌─────────────────────────────────────┐
│           Render Web Service        │
├─────────────────────────────────────┤
│  ┌─────────────┐  ┌──────────────┐  │
│  │   Nginx     │  │   Backend    │  │
│  │  (Port 80)  │  │  (Port 3000) │  │
│  └─────────────┘  └──────────────┘  │
└─────────────────────────────────────┘
```

### Roteamento:
- **Frontend**: `/` (arquivos estáticos)
- **API**: `/api/*` (proxy para backend)
- **Health Check**: `/health`

## 🚀 URLs Finais

- **Aplicação**: `https://suporte-hfs.onrender.com`
- **API**: `https://suporte-hfs.onrender.com/api`
- **Health Check**: `https://suporte-hfs.onrender.com/health`

## 📊 Monitoramento

### Logs
- Acesse o dashboard do Render
- Vá na aba "Logs"
- Monitore erros e performance

### Métricas
- **Requests/min**: Volume de requisições
- **Response Time**: Tempo de resposta
- **Error Rate**: Taxa de erros

## 🔧 Troubleshooting

### Problemas Comuns:

1. **Build falha**
   - Verifique se o Dockerfile.full existe
   - Confirme se todas as dependências estão no package.json

2. **Aplicação não inicia**
   - Verifique os logs no Render
   - Confirme se as variáveis de ambiente estão corretas

3. **CORS errors**
   - O nginx já está configurado para resolver
   - Se persistir, verifique os logs do backend

4. **Banco não conecta**
   - Verifique SUPABASE_URL e SUPABASE_KEY
   - Confirme se o projeto Supabase está ativo

## 🧪 Teste Local

Antes do deploy, teste localmente:

```bash
# Build da imagem
docker build -f Dockerfile.full -t suporte-hfs .

# Executar localmente
docker run -p 80:80 \
  -e SUPABASE_URL=sua_url \
  -e SUPABASE_KEY=sua_chave \
  -e JWT_SECRET=seu_secret \
  suporte-hfs
```

## 💰 Custos

- **Plano Free**: 750 horas/mês
- **Plano Paid**: $7/mês para uso ilimitado
- **Domínio customizado**: Incluído

## 🎯 Próximos Passos Após Deploy

1. **Teste todas as funcionalidades**
2. **Configure domínio customizado** (opcional)
3. **Configure monitoramento**
4. **Faça backup do banco**

---

**Status**: ✅ Pronto para Deploy Completo
**Última atualização**: $(date) 