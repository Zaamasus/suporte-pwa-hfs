import { Layout } from '../components/layout/Layout';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { ClientForm } from '../components/clients/ClientForm';

export function NewClient() {
  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Cadastrar Novo Cliente
        </h1>
        
        <Card>
          <CardHeader className="bg-gray-50 dark:bg-dark-300">
            <h2 className="text-lg font-medium">Informações do Cliente</h2>
          </CardHeader>
          <CardContent className="p-6">
            <ClientForm />
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}