/**
 * Configurações do banco de dados
 */
export const dbConfig = {
  // Configurações para a tabela de usuários
  tables: {
    users: {
      name: 'users',
      columns: {
        id: 'id',
        name: 'name',
        email: 'email',
        password: 'password',
        role: 'role',
        createdAt: 'created_at',
        updatedAt: 'updated_at'
      }
    }
  },
  
  // Tipos de perfil de usuário
  roles: {
    USER: 'user',
    ADMIN: 'admin'
  }
};

/**
 * SQL para criação da tabela de usuários (versão simplificada)
 */
export const userTableSQL = `
CREATE TABLE public.users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password TEXT NOT NULL,
  role VARCHAR(20) DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Trigger para atualizar o updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER users_updated_at
BEFORE UPDATE ON public.users
FOR EACH ROW
EXECUTE PROCEDURE update_updated_at();
`;

/**
 * Consultas SQL comuns para usuários
 */
export const userQueries = {
  // Selecionar todos os usuários
  selectAll: `SELECT * FROM users ORDER BY created_at DESC`,
  
  // Selecionar um usuário pelo ID
  selectById: `SELECT * FROM users WHERE id = $1`,
  
  // Selecionar um usuário pelo email
  selectByEmail: `SELECT * FROM users WHERE email = $1`,
  
  // Inserir um novo usuário
  insert: `
    INSERT INTO users (name, email, password, role)
    VALUES ($1, $2, $3, $4)
    RETURNING *
  `,
  
  // Atualizar um usuário
  update: `
    UPDATE users
    SET name = $1, email = $2, role = $3
    WHERE id = $4
    RETURNING *
  `,
  
  // Excluir um usuário
  delete: `DELETE FROM users WHERE id = $1`
}; 