# 🔗 Conectar Frontend ao Backend Existente

## 📋 Passos para Conectar

### 1. Obter a URL do Backend

1. **Acesse o dashboard do Render**
2. **Vá no seu serviço de backend**
3. **Copie a URL** (exemplo: `https://meu-backend.onrender.com`)

### 2. Atualizar o Código

**No arquivo `src/main.tsx`, linha 12:**

```typescript
axios.defaults.baseURL = 'https://SUA-URL-DO-BACKEND.onrender.com';
```

**Substitua `SUA-URL-DO-BACKEND` pela URL real do seu backend.**

### 3. Verificar CORS no Backend

Certifique-se de que seu backend está configurado para aceitar requisições do frontend:

**No seu backend, verifique se o CORS está configurado para aceitar:**
- `https://suporte-pwa-hfs-1.onrender.com` (URL do seu frontend)

### 4. Deploy do Frontend

1. **Commit e push das alterações:**
```bash
git add src/main.tsx
git commit -m "feat: conecta frontend ao backend existente"
git push
```

2. **O Render fará deploy automático**

### 5. Testar a Conexão

1. **Acesse o frontend:** `https://suporte-pwa-hfs-1.onrender.com`
2. **Abra o console do navegador (F12)**
3. **Tente fazer login**
4. **Verifique se não há erros de CORS**

## 🔧 Configuração de CORS no Backend

Se houver problemas de CORS, no seu backend adicione:

```javascript
// No seu backend
app.use(cors({
  origin: [
    'https://suporte-pwa-hfs-1.onrender.com',
    'http://localhost:5173' // para desenvolvimento
  ],
  credentials: true
}));
```

## 🚀 URLs Finais

- **Frontend**: `https://suporte-pwa-hfs-1.onrender.com`
- **Backend**: `https://seu-backend.onrender.com`
- **API**: `https://seu-backend.onrender.com/api`

## ✅ Checklist

- [ ] URL do backend atualizada no `src/main.tsx`
- [ ] CORS configurado no backend
- [ ] Deploy do frontend feito
- [ ] Teste de login funcionando
- [ ] Console sem erros

---

**Status**: Aguardando URL do backend
**Próximo passo**: Atualizar URL e fazer deploy 