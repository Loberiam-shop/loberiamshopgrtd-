// Serviço de API para integração com o backend
import axios from 'axios';

// Configuração base do axios
const API = axios.create({
  baseURL: 'http://localhost:3001/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor para adicionar token de autenticação
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor para tratamento de erros
API.interceptors.response.use(
  (response) => response,
  (error) => {
    // Tratamento de erro de autenticação
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Serviços de autenticação
export const authService = {
  // Login de usuário
  login: async (credentials) => {
    try {
      const response = await API.post('/login', credentials);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : { error: 'Erro de conexão' };
    }
  },

  // Registro de usuário
  register: async (userData) => {
    try {
      const response = await API.post('/register', userData);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : { error: 'Erro de conexão' };
    }
  },

  // Logout de usuário
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  // Verificar se o usuário está autenticado
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },

  // Obter dados do usuário atual
  getCurrentUser: async () => {
    try {
      const response = await API.get('/me');
      localStorage.setItem('user', JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : { error: 'Erro de conexão' };
    }
  }
};

// Serviços de usuário
export const userService = {
  // Atualizar perfil do usuário
  updateProfile: async (userId, userData) => {
    try {
      const response = await API.put(`/users/${userId}`, userData);
      localStorage.setItem('user', JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : { error: 'Erro de conexão' };
    }
  },

  // Adicionar endereço
  addAddress: async (userId, addressData) => {
    try {
      const response = await API.post(`/users/${userId}/addresses`, addressData);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : { error: 'Erro de conexão' };
    }
  },

  // Adicionar método de pagamento
  addPaymentMethod: async (userId, paymentData) => {
    try {
      const response = await API.post(`/users/${userId}/payment-methods`, paymentData);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : { error: 'Erro de conexão' };
    }
  },

  // Obter pedidos do usuário
  getUserOrders: async (userId) => {
    try {
      const response = await API.get(`/users/${userId}/orders`);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : { error: 'Erro de conexão' };
    }
  },

  // Adicionar produto aos favoritos
  addToFavorites: async (userId, productId) => {
    try {
      const response = await API.post(`/users/${userId}/favorites`, { productId });
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : { error: 'Erro de conexão' };
    }
  },

  // Remover produto dos favoritos
  removeFromFavorites: async (userId, productId) => {
    try {
      const response = await API.delete(`/users/${userId}/favorites/${productId}`);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : { error: 'Erro de conexão' };
    }
  }
};

// Serviços de produtos
export const productService = {
  // Obter todos os produtos
  getAllProducts: async () => {
    try {
      const response = await API.get('/products');
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : { error: 'Erro de conexão' };
    }
  },

  // Obter produto por ID
  getProductById: async (productId) => {
    try {
      const response = await API.get(`/products/${productId}`);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : { error: 'Erro de conexão' };
    }
  },

  // Obter produto por slug
  getProductBySlug: async (slug) => {
    try {
      const response = await API.get(`/products?slug=${slug}`);
      return response.data[0];
    } catch (error) {
      throw error.response ? error.response.data : { error: 'Erro de conexão' };
    }
  },

  // Buscar produtos
  searchProducts: async (params) => {
    try {
      const response = await API.get('/products/search', { params });
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : { error: 'Erro de conexão' };
    }
  },

  // Obter produtos por categoria
  getProductsByCategory: async (category) => {
    try {
      const response = await API.get(`/products?category=${category}`);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : { error: 'Erro de conexão' };
    }
  },

  // Obter produtos em destaque
  getFeaturedProducts: async () => {
    try {
      const response = await API.get('/products?featured=true');
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : { error: 'Erro de conexão' };
    }
  },

  // Obter produtos novos
  getNewProducts: async () => {
    try {
      const response = await API.get('/products?new=true');
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : { error: 'Erro de conexão' };
    }
  },

  // Obter produtos mais vendidos
  getBestSellerProducts: async () => {
    try {
      const response = await API.get('/products?bestSeller=true');
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : { error: 'Erro de conexão' };
    }
  }
};

// Serviços de categorias
export const categoryService = {
  // Obter todas as categorias
  getAllCategories: async () => {
    try {
      const response = await API.get('/categories');
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : { error: 'Erro de conexão' };
    }
  },

  // Obter categoria por ID
  getCategoryById: async (categoryId) => {
    try {
      const response = await API.get(`/categories/${categoryId}`);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : { error: 'Erro de conexão' };
    }
  }
};

// Serviços de pedidos
export const orderService = {
  // Criar novo pedido
  createOrder: async (orderData) => {
    try {
      const response = await API.post('/orders', orderData);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : { error: 'Erro de conexão' };
    }
  },

  // Obter pedido por ID
  getOrderById: async (orderId) => {
    try {
      const response = await API.get(`/orders/${orderId}`);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : { error: 'Erro de conexão' };
    }
  }
};

export default {
  authService,
  userService,
  productService,
  categoryService,
  orderService
};
