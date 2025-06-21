# 🚀 Deploy no Render - Sistema de Suporte HFS

## ✅ Configuração Completa para Render

O projeto está configurado para deploy no Render com duas opções:

### 📋 Opção 1: Aplicação Única (Recomendado)

**Vantagens:**
- ✅ Frontend e backend na mesma URL
- ✅ Sem problemas de CORS
- ✅ Mais fácil de gerenciar
- ✅ Menor custo

**Configuração:**
1. **Tipo**: Web Service
2. **Environment**: Docker
3. **Dockerfile**: `Dockerfile.full`
4. **Branch**: `main`

**Variáveis de Ambiente:**
```
NODE_ENV=production
PORT=80
SUPABASE_URL=sua_url_do_supabase
SUPABASE_KEY=sua_chave_do_supabase
JWT_SECRET=seu_jwt_secret_seguro
```

### 📋 Opção 2: Aplicações Separadas

**Backend:**
- **Tipo**: Web Service
- **Environment**: Node
- **Build Command**: `cd backend && npm install && npm run build`
- **Start Command**: `cd backend && npm start`

**Frontend:**
- **Tipo**: Static Site
- **Build Command**: `npm install && npm run build`
- **Publish Directory**: `dist`

## 🔧 Arquivos Criados

### Docker
- `Dockerfile` - Frontend com nginx
- `Dockerfile.full` - Aplicação completa (frontend + backend)
- `docker-compose.yml` - Desenvolvimento local
- `nginx.conf` - Configuração do nginx
- `start.sh` - Script de inicialização

### Render
- `render.yaml` - Configuração para deploy separado
- `render-single-app.yaml` - Configuração para aplicação única

### Configuração
- `env.example` - Exemplo de variáveis de ambiente
- `DEPLOY-RENDER.md` - Guia detalhado
- `README-RENDER.md` - Este arquivo

## 🚀 Comandos Úteis

### Teste Local
```bash
# Build e teste local
npm run build:skip-ts

# Docker local
npm run docker:build
npm run docker:run

# Docker Compose
npm run docker:compose
```

### Deploy
```bash
# Build para Render
npm run render:deploy
```

## 🔗 URLs Finais

### Opção 1 (Aplicação Única):
- **URL**: `https://suporte-hfs.onrender.com`
- **API**: `https://suporte-hfs.onrender.com/api`

### Opção 2 (Separado):
- **Backend**: `https://suporte-backend.onrender.com`
- **Frontend**: `https://suporte-frontend.onrender.com`

## ⚙️ Configurações Atualizadas

### Frontend
- ✅ Vite configurado para Render
- ✅ PWA configurado
- ✅ Axios configurado para produção
- ✅ Build funcionando

### Backend
- ✅ CORS configurado
- ✅ Supabase integrado
- ✅ JWT configurado
- ✅ Docker configurado

## 🎯 Próximos Passos

1. **Criar conta no Render**
2. **Conectar repositório GitHub**
3. **Escolher opção de deploy**
4. **Configurar variáveis de ambiente**
5. **Fazer deploy**

## 📞 Suporte

- **Logs**: Render Dashboard → Logs
- **Health Check**: `/health` endpoint
- **Métricas**: Render Dashboard → Metrics

---

**Status**: ✅ Pronto para Deploy
**Última atualização**: $(date) 