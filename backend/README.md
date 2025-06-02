# Backend da Aplicação

Backend construído com TypeScript, Express e Supabase.

## Requisitos

- Node.js 14.x ou superior
- npm ou yarn
- Conta no Supabase (https://supabase.io)

## Configuração

1. Clone o repositório
2. Instale as dependências:

```bash
npm install
```

3. Crie um arquivo `.env` baseado no `.env.example`:

```bash
cp .env.example .env
```

4. Configure as variáveis de ambiente no arquivo `.env`:
   - `PORT`: Porta em que o servidor será executado (padrão: 3000)
   - `JWT_SECRET`: Chave secreta para assinar tokens JWT
   - `JWT_EXPIRES_IN`: Tempo de expiração dos tokens JWT (ex: "7d" para 7 dias)
   - `SUPABASE_URL`: URL do seu projeto no Supabase
   - `SUPABASE_KEY`: Chave de serviço (service key) do seu projeto no Supabase

5. Configure o banco de dados no Supabase:
   - Siga as instruções em `src/config/database-schema.md` para criar as tabelas necessárias
   - Configure as políticas de segurança (RLS) conforme necessário

## Executando o Projeto

### Desenvolvimento

```bash
npm run dev
```

Isto iniciará o servidor em modo de desenvolvimento com hot-reload.

### Produção

```bash
npm run build
npm start
```

## Estrutura do Projeto

```
src/
├── config/         # Configurações (Supabase, etc.)
├── controllers/    # Controladores
├── middlewares/    # Middlewares (autenticação, etc.)
├── models/         # Modelos/interfaces
├── routes/         # Rotas da API
├── scripts/        # Scripts utilitários
├── services/       # Camada de serviços
└── index.ts        # Ponto de entrada da aplicação
```

## API Endpoints

### Autenticação

- `POST /api/auth/register`: Registrar um novo usuário
  - Body: `{ name, email, password }`
  - Retorna: `{ user, token }`

- `POST /api/auth/login`: Login de usuário
  - Body: `{ email, password }`
  - Retorna: `{ user, token }`

### Usuários

- `GET /api/users`: Listar todos os usuários (requer autenticação de admin)
  - Retorna: Array de usuários

- `GET /api/users/me`: Obter perfil do usuário atual (requer autenticação)
  - Retorna: Dados do usuário

- `GET /api/users/:id`: Obter usuário por ID (requer autenticação)
  - Retorna: Dados do usuário

- `PUT /api/users/:id`: Atualizar usuário (requer autenticação, apenas o próprio usuário ou admin)
  - Body: Dados do usuário a serem atualizados
  - Retorna: Usuário atualizado

- `DELETE /api/users/:id`: Excluir usuário (requer autenticação, apenas o próprio usuário ou admin)
  - Retorna: Status 204 (No Content)

## Autenticação

Todas as rotas protegidas requerem um token JWT válido no cabeçalho de autorização:

```
Authorization: Bearer [token]
``` 