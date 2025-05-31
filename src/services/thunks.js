// Integração dos serviços de API com o Redux
import { createAsyncThunk } from '@reduxjs/toolkit';
import { 
  authService, 
  userService, 
  productService, 
  categoryService, 
  orderService 
} from './api';

// Thunks de autenticação
export const loginUser = createAsyncThunk(
  'user/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await authService.login(credentials);
      return response;
    } catch (error) {
      return rejectWithValue(error.error || 'Falha ao fazer login');
    }
  }
);

export const registerUser = createAsyncThunk(
  'user/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await authService.register(userData);
      return response;
    } catch (error) {
      return rejectWithValue(error.error || 'Falha ao registrar usuário');
    }
  }
);

export const logoutUser = createAsyncThunk(
  'user/logout',
  async () => {
    authService.logout();
    return null;
  }
);

export const fetchCurrentUser = createAsyncThunk(
  'user/fetchCurrent',
  async (_, { rejectWithValue }) => {
    try {
      const response = await authService.getCurrentUser();
      return response;
    } catch (error) {
      return rejectWithValue(error.error || 'Falha ao obter dados do usuário');
    }
  }
);

// Thunks de usuário
export const updateUserProfile = createAsyncThunk(
  'user/updateProfile',
  async (userData, { getState, rejectWithValue }) => {
    try {
      const { user } = getState().user;
      const response = await userService.updateProfile(user.id, userData);
      return response;
    } catch (error) {
      return rejectWithValue(error.error || 'Falha ao atualizar perfil');
    }
  }
);

export const addUserAddress = createAsyncThunk(
  'user/addAddress',
  async (addressData, { getState, rejectWithValue }) => {
    try {
      const { user } = getState().user;
      const response = await userService.addAddress(user.id, addressData);
      return response;
    } catch (error) {
      return rejectWithValue(error.error || 'Falha ao adicionar endereço');
    }
  }
);

export const addUserPaymentMethod = createAsyncThunk(
  'user/addPaymentMethod',
  async (paymentData, { getState, rejectWithValue }) => {
    try {
      const { user } = getState().user;
      const response = await userService.addPaymentMethod(user.id, paymentData);
      return response;
    } catch (error) {
      return rejectWithValue(error.error || 'Falha ao adicionar método de pagamento');
    }
  }
);

export const fetchUserOrders = createAsyncThunk(
  'orders/fetchUserOrders',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { user } = getState().user;
      const response = await userService.getUserOrders(user.id);
      return response;
    } catch (error) {
      return rejectWithValue(error.error || 'Falha ao obter pedidos');
    }
  }
);

// Thunks de produtos
export const fetchProducts = createAsyncThunk(
  'products/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await productService.getAllProducts();
      return response;
    } catch (error) {
      return rejectWithValue(error.error || 'Falha ao obter produtos');
    }
  }
);

export const fetchProductById = createAsyncThunk(
  'products/fetchById',
  async (productId, { rejectWithValue }) => {
    try {
      const response = await productService.getProductById(productId);
      return response;
    } catch (error) {
      return rejectWithValue(error.error || 'Falha ao obter produto');
    }
  }
);

export const fetchProductBySlug = createAsyncThunk(
  'products/fetchBySlug',
  async (slug, { rejectWithValue }) => {
    try {
      const response = await productService.getProductBySlug(slug);
      return response;
    } catch (error) {
      return rejectWithValue(error.error || 'Falha ao obter produto');
    }
  }
);

export const searchProducts = createAsyncThunk(
  'products/search',
  async (params, { rejectWithValue }) => {
    try {
      const response = await productService.searchProducts(params);
      return response;
    } catch (error) {
      return rejectWithValue(error.error || 'Falha ao buscar produtos');
    }
  }
);

export const fetchProductsByCategory = createAsyncThunk(
  'products/fetchByCategory',
  async (category, { rejectWithValue }) => {
    try {
      const response = await productService.getProductsByCategory(category);
      return response;
    } catch (error) {
      return rejectWithValue(error.error || 'Falha ao obter produtos da categoria');
    }
  }
);

export const fetchFeaturedProducts = createAsyncThunk(
  'products/fetchFeatured',
  async (_, { rejectWithValue }) => {
    try {
      const response = await productService.getFeaturedProducts();
      return response;
    } catch (error) {
      return rejectWithValue(error.error || 'Falha ao obter produtos em destaque');
    }
  }
);

export const fetchNewProducts = createAsyncThunk(
  'products/fetchNew',
  async (_, { rejectWithValue }) => {
    try {
      const response = await productService.getNewProducts();
      return response;
    } catch (error) {
      return rejectWithValue(error.error || 'Falha ao obter produtos novos');
    }
  }
);

export const fetchBestSellerProducts = createAsyncThunk(
  'products/fetchBestSellers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await productService.getBestSellerProducts();
      return response;
    } catch (error) {
      return rejectWithValue(error.error || 'Falha ao obter produtos mais vendidos');
    }
  }
);

export const addToFavorites = createAsyncThunk(
  'products/addToFavorites',
  async (productId, { getState, rejectWithValue }) => {
    try {
      const { user } = getState().user;
      const response = await userService.addToFavorites(user.id, productId);
      return { productId, response };
    } catch (error) {
      return rejectWithValue(error.error || 'Falha ao adicionar aos favoritos');
    }
  }
);

export const removeFromFavorites = createAsyncThunk(
  'products/removeFromFavorites',
  async (productId, { getState, rejectWithValue }) => {
    try {
      const { user } = getState().user;
      const response = await userService.removeFromFavorites(user.id, productId);
      return { productId, response };
    } catch (error) {
      return rejectWithValue(error.error || 'Falha ao remover dos favoritos');
    }
  }
);

// Thunks de categorias
export const fetchCategories = createAsyncThunk(
  'categories/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await categoryService.getAllCategories();
      return response;
    } catch (error) {
      return rejectWithValue(error.error || 'Falha ao obter categorias');
    }
  }
);

export const fetchCategoryById = createAsyncThunk(
  'categories/fetchById',
  async (categoryId, { rejectWithValue }) => {
    try {
      const response = await categoryService.getCategoryById(categoryId);
      return response;
    } catch (error) {
      return rejectWithValue(error.error || 'Falha ao obter categoria');
    }
  }
);

// Thunks de pedidos
export const createOrder = createAsyncThunk(
  'orders/create',
  async (orderData, { rejectWithValue }) => {
    try {
      const response = await orderService.createOrder(orderData);
      return response;
    } catch (error) {
      return rejectWithValue(error.error || 'Falha ao criar pedido');
    }
  }
);

export const fetchOrderById = createAsyncThunk(
  'orders/fetchById',
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await orderService.getOrderById(orderId);
      return response;
    } catch (error) {
      return rejectWithValue(error.error || 'Falha ao obter pedido');
    }
  }
);
