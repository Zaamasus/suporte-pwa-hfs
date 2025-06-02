-- Criação da tabela de anexos
CREATE TABLE IF NOT EXISTS attachments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  ticket_id UUID NOT NULL REFERENCES tickets(id) ON DELETE CASCADE,
  filename TEXT NOT NULL,
  originalname TEXT NOT NULL,
  mimetype TEXT NOT NULL,
  path TEXT NOT NULL,
  size BIGINT NOT NULL,
  url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para performance
CREATE INDEX IF NOT EXISTS idx_attachments_ticket_id ON attachments(ticket_id);

-- Trigger para atualizar o campo updated_at automaticamente
CREATE OR REPLACE FUNCTION update_attachments_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_attachments_updated_at
BEFORE UPDATE ON attachments
FOR EACH ROW
EXECUTE FUNCTION update_attachments_updated_at();

-- Permissões RLS (Row Level Security)
ALTER TABLE attachments ENABLE ROW LEVEL SECURITY;

-- Políticas de acesso:

-- Política para visualização (SELECT)
CREATE POLICY "Anexos são visíveis para todos os usuários autenticados" 
  ON attachments FOR SELECT 
  USING (auth.role() = 'authenticated');

-- Política para inserção (INSERT)
CREATE POLICY "Qualquer usuário autenticado pode inserir anexos" 
  ON attachments FOR INSERT 
  WITH CHECK (auth.role() = 'authenticated');

-- Política para atualização (UPDATE)
CREATE POLICY "Apenas admins e técnicos podem atualizar anexos" 
  ON attachments FOR UPDATE 
  USING (
    auth.uid() IN (
      SELECT id FROM users WHERE role IN ('admin', 'technician')
    )
  );

-- Política para exclusão (DELETE)
CREATE POLICY "Apenas admins podem excluir anexos" 
  ON attachments FOR DELETE 
  USING (
    auth.uid() IN (
      SELECT id FROM users WHERE role = 'admin'
    )
  ); 