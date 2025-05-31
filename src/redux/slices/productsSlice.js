// Atualização do slice de produtos para integração com backend
import { createSlice } from '@reduxjs/toolkit';
import { 
  fetchProducts, 
  fetchProductById, 
  fetchProductBySlug,
  searchProducts,
  fetchProductsByCategory,
  fetchFeaturedProducts,
  fetchNewProducts,
  fetchBestSellerProducts,
  addToFavorites,
  removeFromFavorites
} from '../../services/thunks';

// Estado inicial
const initialState = {
  products: [],
  product: null,
  featuredProducts: [],
  newArrivals: [],
  bestSellers: [],
  loading: false,
  error: null,
  filters: {
    sortBy: 'relevance',
    priceRange: [0, 10000],
    brands: [],
    ratings: null
  }
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
    }
  },
  extraReducers: (builder) => {
    // Fetch All Products
    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Fetch Product By ID
    builder.addCase(fetchProductById.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchProductById.fulfilled, (state, action) => {
      state.loading = false;
      state.product = action.payload;
    });
    builder.addCase(fetchProductById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Fetch Product By Slug
    builder.addCase(fetchProductBySlug.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchProductBySlug.fulfilled, (state, action) => {
      state.loading = false;
      state.product = action.payload;
    });
    builder.addCase(fetchProductBySlug.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Search Products
    builder.addCase(searchProducts.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(searchProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
    });
    builder.addCase(searchProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Fetch Products By Category
    builder.addCase(fetchProductsByCategory.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchProductsByCategory.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
    });
    builder.addCase(fetchProductsByCategory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Fetch Featured Products
    builder.addCase(fetchFeaturedProducts.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchFeaturedProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.featuredProducts = action.payload;
    });
    builder.addCase(fetchFeaturedProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Fetch New Products
    builder.addCase(fetchNewProducts.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchNewProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.newArrivals = action.payload;
    });
    builder.addCase(fetchNewProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Fetch Best Seller Products
    builder.addCase(fetchBestSellerProducts.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchBestSellerProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.bestSellers = action.payload;
    });
    builder.addCase(fetchBestSellerProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Add To Favorites
    builder.addCase(addToFavorites.fulfilled, (state, action) => {
      const productId = action.payload.productId;
      
      // Atualizar na lista de produtos
      const productIndex = state.products.findIndex(p => p.id === productId);
      if (productIndex !== -1) {
        state.products[productIndex].isFavorite = true;
      }
      
      // Atualizar no produto atual
      if (state.product && state.product.id === productId) {
        state.product.isFavorite = true;
      }
      
      // Atualizar em featured products
      const featuredIndex = state.featuredProducts.findIndex(p => p.id === productId);
      if (featuredIndex !== -1) {
        state.featuredProducts[featuredIndex].isFavorite = true;
      }
      
      // Atualizar em new arrivals
      const newIndex = state.newArrivals.findIndex(p => p.id === productId);
      if (newIndex !== -1) {
        state.newArrivals[newIndex].isFavorite = true;
      }
      
      // Atualizar em best sellers
      const bestIndex = state.bestSellers.findIndex(p => p.id === productId);
      if (bestIndex !== -1) {
        state.bestSellers[bestIndex].isFavorite = true;
      }
    });

    // Remove From Favorites
    builder.addCase(removeFromFavorites.fulfilled, (state, action) => {
      const productId = action.payload.productId;
      
      // Atualizar na lista de produtos
      const productIndex = state.products.findIndex(p => p.id === productId);
      if (productIndex !== -1) {
        state.products[productIndex].isFavorite = false;
      }
      
      // Atualizar no produto atual
      if (state.product && state.product.id === productId) {
        state.product.isFavorite = false;
      }
      
      // Atualizar em featured products
      const featuredIndex = state.featuredProducts.findIndex(p => p.id === productId);
      if (featuredIndex !== -1) {
        state.featuredProducts[featuredIndex].isFavorite = false;
      }
      
      // Atualizar em new arrivals
      const newIndex = state.newArrivals.findIndex(p => p.id === productId);
      if (newIndex !== -1) {
        state.newArrivals[newIndex].isFavorite = false;
      }
      
      // Atualizar em best sellers
      const bestIndex = state.bestSellers.findIndex(p => p.id === productId);
      if (bestIndex !== -1) {
        state.bestSellers[bestIndex].isFavorite = false;
      }
    });
  }
});

// Selectors
export const selectProducts = (state) => state.products.products;
export const selectProduct = (state) => state.products.product;
export const selectFeaturedProducts = (state) => state.products.featuredProducts;
export const selectNewArrivals = (state) => state.products.newArrivals;
export const selectBestSellers = (state) => state.products.bestSellers;
export const selectProductsLoading = (state) => state.products.loading;
export const selectProductsError = (state) => state.products.error;
export const selectFilters = (state) => state.products.filters;

// Selector para produtos por categoria
export const selectProductsByCategory = (state, category) => {
  return state.products.products.filter(product => product.category === category);
};

// Selector para produtos favoritos
export const selectFavoriteProducts = (state) => {
  return state.products.products.filter(product => product.isFavorite);
};

// Actions
export const { setFilters, resetFilters } = productsSlice.actions;

export default productsSlice.reducer;
