# Backend - HFS INFORMATICA

Este é o backend da aplicação HFS INFORMATICA, feito em Node.js + Express + SQLite.

## Como rodar

```bash
cd backend
npm install
node index.js
```

A API estará disponível em http://localhost:4000

## Endpoints principais

- `POST /api/auth/register` - Cadastro de cliente
- `POST /api/auth/login` - Login (retorna JWT)
- `GET /api/tickets` - Listar tickets (protegido, precisa JWT)
- `POST /api/tickets` - Criar ticket (protegido, cliente)
- `GET /api/clients` - Listar clientes (protegido, técnico/admin)

## Autenticação

- Use o token JWT retornado no login no header:
  - `Authorization: Bearer <token>`

## Banco de dados

- SQLite local (`hfs.db`)
- Tabelas: `users`, `tickets`

## Usuários de teste

- Cliente:
  - Email: roberta@alvotech.com
  - Senha: senha123
- Técnico:
  - Email: samuel@techsupport.com
  - Senha: senha123

## Observações

- O frontend está na pasta raiz do projeto.
- Para produção, use variáveis de ambiente para o JWT_SECRET. 