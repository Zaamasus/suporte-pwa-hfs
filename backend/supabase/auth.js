const { supabase } = require('./config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET || 'supersecret';

/**
 * Serviço de autenticação usando Supabase
 * Mantém compatibilidade com a API existente
 */
const authService = {
  /**
   * Registra um novo usuário
   * @param {Object} userData - Dados do usuário (name, email, password, company)
   * @returns {Promise<Object>} - Objeto com dados do usuário criado
   */
  async register(userData) {
    try {
      const { name, email, password, company } = userData;
      
      if (!name || !email || !password) {
        throw new Error('Dados obrigatórios ausentes');
      }
      
      // Hash da senha
      const hash = bcrypt.hashSync(password, 8);
      
      // Criar usuário no Supabase
      const { data, error } = await supabase
        .from('users')
        .insert([
          { 
            name, 
            email, 
            password: hash, 
            role: 'client',
            company,
            createdAt: new Date().toISOString()
          }
        ])
        .select();
      
      if (error) {
        if (error.code === '23505') { // Código de erro para violação de unique constraint
          throw new Error('Email já cadastrado');
        }
        throw error;
      }
      
      // Remover o hash da senha antes de retornar
      const user = data[0];
      delete user.password;
      
      return user;
    } catch (error) {
      console.error('Erro no registro de usuário:', error);
      throw error;
    }
  },
  
  /**
   * Autentica um usuário
   * @param {string} email - Email do usuário
   * @param {string} password - Senha do usuário
   * @returns {Promise<Object>} - Objeto com dados do usuário e token
   */
  async login(email, password) {
    try {
      // Buscar usuário pelo email
      const { data: users, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .limit(1);
      
      if (error) throw error;
      
      const user = users[0];
      if (!user) {
        throw new Error('Email ou senha inválidos');
      }
      
      // Verificar senha
      if (!bcrypt.compareSync(password, user.password)) {
        throw new Error('Email ou senha inválidos');
      }
      
      // Gerar token JWT
      const token = jwt.sign(
        { 
          id: user.id, 
          email: user.email, 
          role: user.role,
          name: user.name,
          company: user.company
        }, 
        SECRET, 
        { expiresIn: '8h' }
      );
      
      // Remover senha do objeto de usuário
      delete user.password;
      
      return { user, token };
    } catch (error) {
      console.error('Erro no login:', error);
      throw error;
    }
  },
  
  /**
   * Middleware para autenticação JWT
   */
  authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) return res.status(401).json({ error: 'Token não fornecido' });
    
    jwt.verify(token, SECRET, (err, user) => {
      if (err) return res.status(403).json({ error: 'Token inválido' });
      req.user = user;
      next();
    });
  }
};

module.exports = authService; 