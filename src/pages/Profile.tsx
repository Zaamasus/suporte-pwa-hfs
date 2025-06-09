import { useState } from 'react';
import { useQuery, useMutation } from 'react-query';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Layout } from '../components/layout/Layout';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { useAuth } from '../contexts/AuthContext';
import { User, Lock, Eye, EyeOff } from 'lucide-react';

interface ProfileData {
  name: string;
  email: string;
}

interface PasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export function Profile() {
  const { user } = useAuth();
  
  const [profileData, setProfileData] = useState<ProfileData>({
    name: '',
    email: '',
  });
  
  const [passwordData, setPasswordData] = useState<PasswordData>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  
  const [showPassword, setShowPassword] = useState(false);
  
  const { isLoading } = useQuery(
    'profile',
    async () => {
      const response = await axios.get('/api/users/me');
      return response.data;
    },
    {
      onSuccess: (data) => {
        setProfileData({
          name: data.name,
          email: data.email,
        });
      },
      onError: () => {
        toast.error('Erro ao carregar dados do perfil');
      },
    }
  );
  
  const profileMutation = useMutation(
    async (data: ProfileData) => {
      const response = await axios.put('/api/users/me', data);
      return response.data;
    },
    {
      onSuccess: () => {
        toast.success('Perfil atualizado com sucesso!');
      },
      onError: (error: any) => {
        toast.error(error.response?.data?.message || 'Erro ao atualizar perfil');
      },
    }
  );
  
  const passwordMutation = useMutation(
    async (data: { currentPassword: string; newPassword: string }) => {
      const response = await axios.put('/api/users/me/password', data);
      return response.data;
    },
    {
      onSuccess: () => {
        toast.success('Senha atualizada com sucesso!');
        setPasswordData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        });
      },
      onError: (error: any) => {
        toast.error(error.response?.data?.message || 'Erro ao atualizar senha');
      },
    }
  );
  
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    profileMutation.mutate(profileData);
  };
  
  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordData.newPassword.length < 6) {
      toast.error('A nova senha deve ter pelo menos 6 caracteres');
      return;
    }
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('As senhas não coincidem');
      return;
    }
    
    passwordMutation.mutate({
      currentPassword: passwordData.currentPassword,
      newPassword: passwordData.newPassword,
    });
  };
  
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Meu Perfil</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Informações do Perfil */}
          <div className="bg-white dark:bg-dark-200 rounded-lg shadow p-6">
            <div className="flex items-center mb-6">
              <User className="h-6 w-6 mr-2 text-indigo-500" />
              <h2 className="text-xl font-semibold">Informações Pessoais</h2>
            </div>
            
            {isLoading ? (
              <div className="text-center py-4">Carregando...</div>
            ) : (
              <form onSubmit={handleProfileSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">
                    Nome
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={profileData.name}
                    onChange={handleProfileChange}
                    placeholder="Seu nome"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={profileData.email}
                    onChange={handleProfileChange}
                    placeholder="Seu email"
                    disabled
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    O email não pode ser alterado.
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Função
                  </label>
                  <div className="px-3 py-2 bg-gray-100 dark:bg-dark-300 rounded-md text-gray-700 dark:text-gray-300">
                    {user?.role === 'admin' && 'Administrador'}
                    {user?.role === 'technician' && 'Técnico'}
                    {user?.role === 'client' && 'Cliente'}
                  </div>
                </div>
                
                <Button
                  type="submit"
                  isLoading={profileMutation.isLoading}
                >
                  Atualizar Perfil
                </Button>
              </form>
            )}
          </div>
          
          {/* Alterar Senha */}
          <div className="bg-white dark:bg-dark-200 rounded-lg shadow p-6">
            <div className="flex items-center mb-6">
              <Lock className="h-6 w-6 mr-2 text-indigo-500" />
              <h2 className="text-xl font-semibold">Alterar Senha</h2>
            </div>
            
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div>
                <label htmlFor="currentPassword" className="block text-sm font-medium mb-1">
                  Senha Atual
                </label>
                <div className="relative">
                  <Input
                    id="currentPassword"
                    name="currentPassword"
                    type={showPassword ? 'text' : 'password'}
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    placeholder="Digite sua senha atual"
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={toggleShowPassword}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>
              
              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium mb-1">
                  Nova Senha
                </label>
                <div className="relative">
                  <Input
                    id="newPassword"
                    name="newPassword"
                    type={showPassword ? 'text' : 'password'}
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    placeholder="Digite sua nova senha"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">
                  Confirmar Nova Senha
                </label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showPassword ? 'text' : 'password'}
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    placeholder="Confirme sua nova senha"
                    required
                  />
                </div>
              </div>
              
              <Button
                type="submit"
                isLoading={passwordMutation.isLoading}
              >
                Alterar Senha
              </Button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
} 