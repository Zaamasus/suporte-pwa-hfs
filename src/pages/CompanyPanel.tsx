import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import axios from 'axios';
import { Layout } from '../components/layout/Layout';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Mail, Phone, Calendar, Pencil, User, Building } from 'lucide-react';

interface Client {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company: string;
  created_at: string;
}

interface Company {
  id: string;
  name: string;
  color?: string;
  created_at: string;
  updated_at: string;
}

export function CompanyPanel() {
  const { companyName } = useParams<{ companyName: string }>();
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  
  const decodedCompanyName = companyName ? decodeURIComponent(companyName) : '';
  
  const { data: company, isLoading: isLoadingCompany } = useQuery<Company>(
    ['company', decodedCompanyName],
    async () => {
      const response = await axios.get(`/api/companies/name/${decodedCompanyName}`);
      return response.data;
    },
    {
      enabled: !!decodedCompanyName,
    }
  );
  
  const { data: clients, isLoading: isLoadingClients } = useQuery<Client[]>(
    ['companyClients', decodedCompanyName],
    async () => {
      const response = await axios.get(`/api/companies/name/${decodedCompanyName}/clients`);
      return response.data;
    },
    {
      enabled: !!decodedCompanyName,
    }
  );
  
  const filteredClients = clients?.filter(client =>
    client.name.toLowerCase().includes(search.toLowerCase()) ||
    (client.email && client.email.toLowerCase().includes(search.toLowerCase()))
  ) || [];
  
  if (isLoadingCompany || isLoadingClients) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">Carregando...</div>
        </div>
      </Layout>
    );
  }
  
  if (!company) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              Empresa não encontrada
            </h2>
            <Button onClick={() => navigate('/companies')}>
              Voltar para lista de empresas
            </Button>
          </div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div className="flex items-center">
            <div 
              className="w-10 h-10 rounded-full mr-4 flex items-center justify-center"
              style={{ backgroundColor: company.color || '#6366F1' }}
            >
              <Building className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{company.name}</h1>
          </div>
          
          <div className="flex space-x-2">
            {company.id && (
              <Link to={`/companies/edit/${company.id}`}>
                <Button leftIcon={<Pencil className="h-4 w-4" />} variant="outline">
                  Editar Empresa
                </Button>
              </Link>
            )}
            <Link to="/clients/new" state={{ preselectedCompany: company.name }}>
              <Button leftIcon={<User className="h-4 w-4" />}>
                Novo Cliente
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="bg-white dark:bg-dark-200 rounded-lg shadow-sm p-4 mb-6">
          <h2 className="text-lg font-semibold mb-2">Informações da Empresa</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-gray-500" />
              <div>
                <div className="text-sm text-gray-500">Criada em</div>
                <div>{new Date(company.created_at).toLocaleDateString()}</div>
              </div>
            </div>
            <div className="flex items-center">
              <User className="h-5 w-5 mr-2 text-gray-500" />
              <div>
                <div className="text-sm text-gray-500">Total de clientes</div>
                <div>{clients?.length || 0}</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Clientes</h2>
          <Input
            placeholder="Buscar cliente por nome ou email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mb-4"
          />
          
          {filteredClients.length === 0 ? (
            <div className="text-center py-8 bg-white dark:bg-dark-200 rounded-lg shadow">
              <p className="text-gray-500">Nenhum cliente encontrado.</p>
              <Link to="/clients/new" state={{ preselectedCompany: company.name }} className="mt-2 inline-block">
                <Button size="sm">Adicionar Cliente</Button>
              </Link>
            </div>
          ) : (
            <div className="bg-white dark:bg-dark-200 rounded-lg shadow overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-dark-300">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Nome
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Telefone
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Data de Cadastro
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-dark-200 divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredClients.map((client) => (
                    <tr key={client.id} className="hover:bg-gray-50 dark:hover:bg-dark-300">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {client.name}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 mr-2 text-gray-500" />
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {client.email}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {client.phone ? (
                          <div className="flex items-center">
                            <Phone className="h-4 w-4 mr-2 text-gray-500" />
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {client.phone}
                            </div>
                          </div>
                        ) : (
                          <span className="text-sm text-gray-400">Não informado</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {new Date(client.created_at).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link to={`/clients/edit/${client.id}`}>
                          <Button variant="outline" size="sm">
                            Editar
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
} 