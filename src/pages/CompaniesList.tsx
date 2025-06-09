import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Plus, Pencil, Trash2, AlertCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { Dialog } from '../components/ui/Dialog';

interface Company {
  id: string;
  name: string;
  color?: string;
  created_at: string;
  updated_at: string;
}

export function CompaniesList() {
  const [search, setSearch] = useState('');
  const [deleteCompanyId, setDeleteCompanyId] = useState<string | null>(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  
  const { data: companies, isLoading } = useQuery<Company[]>('companies', async () => {
    const response = await axios.get('/api/companies');
    return response.data;
  });
  
  const deleteMutation = useMutation(
    (id: string) => axios.delete(`/api/companies/${id}`),
    {
      onSuccess: () => {
        toast.success('Empresa excluída com sucesso!');
        queryClient.invalidateQueries('companies');
        setDeleteCompanyId(null);
      },
      onError: (error: any) => {
        toast.error(error.response?.data?.message || 'Erro ao excluir empresa');
        setDeleteCompanyId(null);
      },
    }
  );
  
  const handleDeleteClick = (id: string) => {
    setDeleteCompanyId(id);
  };
  
  const confirmDelete = () => {
    if (deleteCompanyId) {
      deleteMutation.mutate(deleteCompanyId);
    }
  };
  
  const cancelDelete = () => {
    setDeleteCompanyId(null);
  };
  
  const filteredCompanies = companies?.filter(company => 
    company.name.toLowerCase().includes(search.toLowerCase())
  ) || [];
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Empresas</h1>
          <Link to="/companies/new">
            <Button leftIcon={<Plus className="h-4 w-4" />}>
              Nova Empresa
            </Button>
          </Link>
        </div>
        
        <div className="mb-6">
          <Input
            placeholder="Buscar empresa..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        
        {isLoading ? (
          <div className="text-center py-8">Carregando...</div>
        ) : (
          <>
            {filteredCompanies.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                Nenhuma empresa encontrada.
              </div>
            ) : (
              <div className="bg-white dark:bg-dark-200 rounded-lg shadow overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-dark-300">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Cor
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Nome
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Criada em
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Ações
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-dark-200 divide-y divide-gray-200 dark:divide-gray-700">
                    {filteredCompanies.map((company) => (
                      <tr 
                        key={company.id} 
                        className="hover:bg-gray-50 dark:hover:bg-dark-300 cursor-pointer"
                        onClick={() => navigate(`/companies/${encodeURIComponent(company.name)}`)}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div 
                            className="w-6 h-6 rounded-full" 
                            style={{ backgroundColor: company.color || '#6366F1' }}
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {company.name}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {new Date(company.created_at).toLocaleDateString()}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-2" onClick={(e) => e.stopPropagation()}>
                            <Button
                              variant="outline"
                              size="sm"
                              leftIcon={<Pencil className="h-4 w-4" />}
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/companies/edit/${company.id}`);
                              }}
                            >
                              Editar
                            </Button>
                            <Button
                              variant="danger"
                              size="sm"
                              leftIcon={<Trash2 className="h-4 w-4" />}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteClick(company.id);
                              }}
                            >
                              Excluir
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
        
        <Dialog
          isOpen={!!deleteCompanyId}
          onClose={cancelDelete}
          title="Excluir Empresa"
          description="Tem certeza que deseja excluir esta empresa? Esta ação não pode ser desfeita."
          icon={<AlertCircle className="h-6 w-6 text-red-500" />}
          actions={
            <>
              <Button variant="outline" onClick={cancelDelete}>
                Cancelar
              </Button>
              <Button 
                variant="danger" 
                onClick={confirmDelete}
                isLoading={deleteMutation.isLoading}
              >
                Excluir
              </Button>
            </>
          }
        />
      </div>
    </Layout>
  );
} 