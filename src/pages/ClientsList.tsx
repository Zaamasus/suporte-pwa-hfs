import { useState } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Plus, ChevronDown, ChevronRight, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Client {
  id: string;
  name: string;
  email: string;
  company: string;
  created_at: string;
}

export function ClientsList() {
  const [search, setSearch] = useState('');
  const [openCompany, setOpenCompany] = useState<string | null>(null);

  const { data: clients, isLoading } = useQuery<Client[]>('clients', async () => {
    const response = await axios.get('/api/users/clients');
    return response.data;
  });

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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Clientes por Empresa</h1>
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

      {isLoading ? (
        <div className="text-center py-8">Carregando...</div>
      ) : (
        <div className="space-y-4">
          {filteredCompanies.length === 0 && (
            <div className="text-center text-gray-500">Nenhuma empresa ou cliente encontrado.</div>
          )}
          {filteredCompanies.map(([company, clients]) => (
            <div key={company} className="bg-white dark:bg-dark-200 rounded-lg shadow">
              <button
                className="w-full flex items-center justify-between px-6 py-4 text-lg font-semibold text-left focus:outline-none"
                onClick={() => setOpenCompany(openCompany === company ? null : company)}
              >
                <span>{company}</span>
                {openCompany === company ? <ChevronDown /> : <ChevronRight />}
              </button>
              {openCompany === company && (
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Nome</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clients.map(client => (
                      <tr key={client.id} className="hover:bg-gray-50 dark:hover:bg-dark-300">
                        <td className="px-6 py-4 whitespace-nowrap">{client.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap flex items-center">
                          <Mail className="h-4 w-4 mr-2" />
                          {client.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
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
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}