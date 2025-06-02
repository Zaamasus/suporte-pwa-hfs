# Estrutura do Banco de Dados no Supabase

Este documento descreve a estrutura do banco de dados PostgreSQL no Supabase para a aplicação.

## Tabela: users

Para criar a tabela de usuários no Supabase, siga as etapas abaixo:

1. Acesse o dashboard do Supabase (https://app.supabase.com)
2. Selecione seu projeto (gxmuywjmzdwswzebqggs)
3. Navegue até "SQL Editor" ou "Table Editor"
4. Execute o seguinte SQL para criar a tabela de usuários:

```sql
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

-- Configurar Row Level Security (RLS)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Políticas RLS
-- Permitir aos usuários visualizar seu próprio perfil
CREATE POLICY "Usuários podem ver seu próprio perfil" ON public.users
  FOR SELECT USING (auth.uid() = id);

-- Permitir aos usuários atualizar seu próprio perfil
CREATE POLICY "Usuários podem atualizar seu próprio perfil" ON public.users
  FOR UPDATE USING (auth.uid() = id);

-- Administradores podem ver todos os perfis
CREATE POLICY "Administradores podem ver todos os perfis" ON public.users
  FOR SELECT USING (
    auth.jwt() ->> 'role' = 'admin'
  );

-- Administradores podem atualizar todos os perfis
CREATE POLICY "Administradores podem atualizar todos os perfis" ON public.users
  FOR UPDATE USING (
    auth.jwt() ->> 'role' = 'admin'
  );

-- Permitir inserção de novos usuários
CREATE POLICY "Permitir inserção de novos usuários" ON public.users
  FOR INSERT WITH CHECK (true);

-- Permitir que os usuários excluam seu próprio perfil
CREATE POLICY "Usuários podem excluir seu próprio perfil" ON public.users
  FOR DELETE USING (auth.uid() = id);

-- Administradores podem excluir qualquer perfil
CREATE POLICY "Administradores podem excluir qualquer perfil" ON public.users
  FOR DELETE USING (
    auth.jwt() ->> 'role' = 'admin'
  );
```

## Versão Simplificada (Sem RLS)

Se você estiver tendo problemas com o Row Level Security (RLS), você pode usar uma versão simplificada da tabela:

```sql
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
```

## Configuração Adicional

### Habilitando o Armazenamento

Para armazenar arquivos (como imagens de perfil), você pode criar um bucket no Storage:

1. No dashboard do Supabase, vá para "Storage" > "Create a new bucket"
2. Crie um bucket chamado "avatars" para armazenar imagens de perfil
3. Configure as políticas RLS conforme necessário para permitir que os usuários acessem apenas seus próprios arquivos

### Configuração de Autenticação

O Supabase também oferece autenticação integrada, mas neste projeto estamos implementando nossa própria autenticação usando JWT. Se desejar mudar para a autenticação do Supabase no futuro, você pode explorar a documentação oficial.

## Dicas de Uso

### Usando o Table Editor

Em vez de usar SQL diretamente, você também pode usar o Table Editor do Supabase para criar a tabela:

1. Vá para "Table Editor" > "Create a new table"
2. Defina o nome da tabela como "users"
3. Adicione as colunas conforme a estrutura acima
4. Defina as restrições necessárias (como chave primária, uniqueness, etc.)

### Testando a Conexão

Para verificar se seu backend está se conectando corretamente ao Supabase, você pode adicionar um endpoint de teste em seu servidor Express:

```typescript
app.get('/api/test-db', async (req, res) => {
  try {
    const { data, error } = await supabase.from('users').select('id, name, email').limit(1);
    
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    
    return res.json({ success: true, data });
  } catch (error) {
    console.error('Erro ao testar conexão:', error);
    return res.status(500).json({ error: 'Erro ao testar conexão com o banco de dados' });
  }
});
``` 