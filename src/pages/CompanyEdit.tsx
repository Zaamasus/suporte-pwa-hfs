import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import { Layout } from '../components/layout/Layout';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { ColorPicker } from '../components/ui/ColorPicker';
import { toast } from 'react-hot-toast';

interface Company {
  id: string;
  name: string;
  color?: string;
  created_at: string;
  updated_at: string;
}

export function CompanyEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const isEditMode = !!id;
  
  const [formData, setFormData] = useState({
    name: '',
    color: '#6366F1', // Cor padrão (indigo)
  });
  
  const { data: company, isLoading: isLoadingCompany } = useQuery<Company>(
    ['company', id],
    async () => {
      if (!id) return null;
      const response = await axios.get(`/api/companies/id/${id}`);
      return response.data;
    },
    {
      enabled: isEditMode,
    }
  );
  
  useEffect(() => {
    if (company) {
      setFormData({
        name: company.name,
        color: company.color || '#6366F1',
      });
    }
  }, [company]);
  
  const createMutation = useMutation(
    (data: typeof formData) => axios.post('/api/companies', data),
    {
      onSuccess: () => {
        toast.success('Empresa criada com sucesso!');
        queryClient.invalidateQueries('companies');
        navigate('/companies');
      },
      onError: (error: any) => {
        toast.error(error.response?.data?.message || 'Erro ao criar empresa');
      },
    }
  );
  
  const updateMutation = useMutation(
    (data: typeof formData) => axios.put(`/api/companies/${id}`, data),
    {
      onSuccess: () => {
        toast.success('Empresa atualizada com sucesso!');
        queryClient.invalidateQueries(['company', id]);
        queryClient.invalidateQueries('companies');
        navigate('/companies');
      },
      onError: (error: any) => {
        toast.error(error.response?.data?.message || 'Erro ao atualizar empresa');
      },
    }
  );
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      toast.error('O nome da empresa é obrigatório');
      return;
    }
    
    if (isEditMode) {
      updateMutation.mutate(formData);
    } else {
      createMutation.mutate(formData);
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleColorChange = (color: string) => {
    setFormData(prev => ({ ...prev, color }));
  };
  
  if (isEditMode && isLoadingCompany) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">Carregando...</div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">
          {isEditMode ? 'Editar Empresa' : 'Nova Empresa'}
        </h1>
        
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white dark:bg-dark-200 p-6 rounded-lg shadow">
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Nome da Empresa
            </label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Digite o nome da empresa"
              required
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="color" className="block text-sm font-medium mb-1">
              Cor (opcional)
            </label>
            <ColorPicker
              color={formData.color}
              onChange={handleColorChange}
            />
            <p className="text-xs text-gray-500 mt-1">
              Esta cor será usada para identificar visualmente a empresa.
            </p>
          </div>
          
          <div className="flex justify-end space-x-4">
            <Button 
              variant="outline" 
              type="button" 
              onClick={() => navigate('/companies')}
            >
              Cancelar
            </Button>
            <Button 
              type="submit" 
              isLoading={createMutation.isLoading || updateMutation.isLoading}
            >
              {isEditMode ? 'Salvar Alterações' : 'Criar Empresa'}
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
} 