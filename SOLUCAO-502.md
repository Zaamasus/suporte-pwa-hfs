# 🚨 Erro 502 - Solução Rápida

## ❌ Problema
O erro 502 (Bad Gateway) acontece porque você está usando apenas o **frontend** no Render, mas o código está tentando acessar o **backend** na mesma URL.

## ✅ Solução

### Opção 1: Usar Aplicação Completa (Recomendado)

**No Render Dashboard:**

1. **Vá em [render.com](https://render.com)**
2. **Acesse seu serviço** `suporte-pwa-hfs-1`
3. **Clique em "Settings"**
4. **Vá em "Build & Deploy"**
5. **Altere:**
   ```
   Dockerfile Path: Dockerfile.full
   Docker Context: .
   ```
6. **Configure variáveis de ambiente:**
   ```
   NODE_ENV=production
   PORT=80
   SUPABASE_URL=https://gxmuywjmzdwswzebqggs.supabase.co
   SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd4bXV5d2ptemR3c3d6ZWJxZ2dzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg3MjMxNjcsImV4cCI6MjA2NDI5OTE2N30.XQ1nW3xINThB6MWcx-XuJLMP3relXtbBPIb8-8i-r2U
   ```
7. **Clique em "Manual Deploy"**

### Opção 2: Conectar ao Backend Existente

Se você já tem um backend rodando, me diga a URL para eu atualizar o código.

## 🔍 Verificação e Debug

### Página de Debug
Acesse: `https://suporte-pwa-hfs-1.onrender.com/#/debug`

Esta página irá:
- ✅ Testar conectividade com o backend
- ✅ Verificar status da API
- ✅ Mostrar informações do ambiente
- ✅ Explicar erros comuns

### Health Check Manual
Teste diretamente: `https://suporte-pwa-hfs-1.onrender.com/health`

## ⚠️ Erros Comuns

### Chrome Extension (Não afeta a aplicação)
Os erros `pinComponent.js` são de uma extensão do Chrome (PIN Company Discounts) e **não afetam** sua aplicação. Você pode:
- Ignorar esses erros
- Desabilitar a extensão
- Usar modo incógnito

### Meta Tag Deprecated
O aviso sobre `apple-mobile-web-app-capable` foi corrigido. A aplicação agora usa a tag moderna `mobile-web-app-capable`.

## 📞 Ajuda

Se continuar com erro 502:
1. **Acesse a página de debug** para diagnóstico automático
2. **Verifique os logs** no Render
3. **Confirme se as variáveis** estão corretas
4. **Aguarde o build** completar (5-10 minutos)

---

**Status**: Aguardando configuração do Dockerfile.full 