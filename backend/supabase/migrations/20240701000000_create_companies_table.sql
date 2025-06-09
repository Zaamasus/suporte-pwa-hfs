-- Criação da tabela de empresas
CREATE TABLE IF NOT EXISTS public.companies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL UNIQUE,
    color TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Adicionar índices
CREATE INDEX IF NOT EXISTS companies_name_idx ON public.companies (name);

-- Adicionar RLS (Row Level Security)
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;

-- Políticas de segurança
CREATE POLICY "Empresas visíveis para usuários autenticados"
ON public.companies
FOR SELECT
USING (auth.role() = 'authenticated');

CREATE POLICY "Apenas administradores e técnicos podem criar empresas"
ON public.companies
FOR INSERT
WITH CHECK (
  auth.uid() IN (
    SELECT id FROM public.users WHERE role IN ('admin', 'technician')
  )
);

CREATE POLICY "Apenas administradores e técnicos podem atualizar empresas"
ON public.companies
FOR UPDATE
USING (
  auth.uid() IN (
    SELECT id FROM public.users WHERE role IN ('admin', 'technician')
  )
);

CREATE POLICY "Apenas administradores podem excluir empresas"
ON public.companies
FOR DELETE
USING (
  auth.uid() IN (
    SELECT id FROM public.users WHERE role = 'admin'
  )
);

-- Trigger para atualizar o campo updated_at automaticamente
CREATE OR REPLACE FUNCTION update_companies_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_companies_updated_at_trigger
BEFORE UPDATE ON public.companies
FOR EACH ROW
EXECUTE FUNCTION update_companies_updated_at(); 