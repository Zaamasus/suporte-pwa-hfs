import { useState } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Plus, Building } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { toast } from 'react-hot-toast';
import { useAuth } from '../contexts/AuthContext';

interface Client {
  id: string;
  name: string;
  email: string;
  company: string;
  created_at: string;
}

export function ClientsList() {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  const { data: clients, isLoading: isLoadingClients } = useQuery<Client[]>('clients', async () => {
    const response = await axios.get('/api/users/clients');
    return response.data;
  });

  // Buscar ou criar empresa antes de navegar
  const getOrCreateCompany = async (name: string) => {
    if (!user) {
      toast.error('Você precisa estar autenticado para acessar esta funcionalidade');
      return;
    }

    setIsLoading(true);
    try {
      console.log('Buscando empresa:', name);
      const response = await axios.get(`http://localhost:3000/api/companies/name/${encodeURIComponent(name)}`);
      console.log('Resposta do servidor:', response.data);
      navigate(`/companies/${encodeURIComponent(name)}`);
      return response.data;
    } catch (error: any) {
      console.error('Erro ao buscar empresa:', error);
      if (error.response?.status === 404) {
        // Se a empresa não existe, cria uma nova
        try {
          const createResponse = await axios.post('/api/companies', {
            name: name,
            color: '#6366F1' // Cor padrão
          });
          console.log('Empresa criada:', createResponse.data);
          toast.success(`Empresa "${name}" criada com sucesso!`);
          navigate(`/companies/${encodeURIComponent(name)}`);
          return createResponse.data;
        } catch (createError: any) {
          console.error('Erro ao criar empresa:', createError);
          if (createError.response?.status === 401) {
            toast.error('Sua sessão expirou. Por favor, faça login novamente.');
            navigate('/login');
          } else {
            toast.error(`Erro ao criar empresa: ${createError.response?.data?.message || 'Erro desconhecido'}`);
          }
        }
      } else if (error.response?.status === 401) {
        toast.error('Sua sessão expirou. Por favor, faça login novamente.');
        navigate('/login');
      } else {
        toast.error(`Erro ao buscar empresa: ${error.response?.data?.message || 'Erro desconhecido'}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Agrupa clientes por empresa
  const grouped = (clients || []).reduce((acc, client) => {
    const company = client.company || 'Sem Empresa';
    if (!acc[company]) acc[company] = [];
    acc[company].push(client);
    return acc;
  }, {} as Record<string, Client[]>);

  // Filtra empresas e clientes pelo termo de busca
  const filteredCompanies = Object.entries(grouped).filter(([company, clients]) => {
    const matchCompany = company.toLowerCase().includes(search.toLowerCase());
    const matchClient = clients.some(client =>
      client.name.toLowerCase().includes(search.toLowerCase()) ||
      client.email.toLowerCase().includes(search.toLowerCase())
    );
    return matchCompany || matchClient;
  });

  const handleCompanyClick = (company: string) => {
    getOrCreateCompany(company);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Empresas</h1>
          <Link to="/clients/new">
            <Button leftIcon={<Plus className="h-4 w-4" />}>
              Novo Cliente
            </Button>
          </Link>
        </div>

        <div className="mb-6">
          <Input
            placeholder="Buscar empresa ou cliente..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {isLoadingClients || isLoading ? (
          <div className="text-center py-8">Carregando...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCompanies.length === 0 && (
              <div className="col-span-full text-center text-gray-500">Nenhuma empresa ou cliente encontrado.</div>
            )}
            {filteredCompanies.map(([company, clients]) => (
              <div 
                key={company} 
                className="bg-white dark:bg-dark-200 rounded-lg shadow p-6 cursor-pointer hover:bg-gray-50 dark:hover:bg-dark-300 transition-colors"
                onClick={() => handleCompanyClick(company)}
              >
                <div className="flex items-center mb-4">
                  <Building className="h-6 w-6 mr-2 text-indigo-500" />
                  <h2 className="text-lg font-semibold">{company}</h2>
                </div>
                <div className="text-sm text-gray-500">
                  {clients.length} {clients.length === 1 ? 'cliente' : 'clientes'}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}