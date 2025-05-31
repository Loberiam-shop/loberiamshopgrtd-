// Atualização do slice de carrinho para integração com backend
import { createSlice } from '@reduxjs/toolkit';
import { createOrder } from '../../services/thunks';

// Estado inicial
const initialState = {
  items: [],
  coupon: null,
  shipping: 0,
  loading: false,
  error: null,
  orderSuccess: null
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { product, quantity } = action.payload;
      const existingItem = state.items.find(item => item.id === product.id);
      
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({
          id: product.id,
          name: product.name,
          price: product.discountPrice || product.price,
          image: product.images ? product.images[0] : null,
          quantity,
          stock: product.stock
        });
      }
    },
    
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    
    updateQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const item = state.items.find(item => item.id === productId);
      
      if (item) {
        item.quantity = quantity;
      }
    },
    
    clearCart: (state) => {
      state.items = [];
      state.coupon = null;
      state.shipping = 0;
      state.orderSuccess = null;
    },
    
    applyCoupon: (state, action) => {
      state.coupon = action.payload;
    },
    
    removeCoupon: (state) => {
      state.coupon = null;
    },
    
    setShipping: (state, action) => {
      state.shipping = action.payload;
    },
    
    resetOrderSuccess: (state) => {
      state.orderSuccess = null;
    }
  },
  extraReducers: (builder) => {
    // Create Order
    builder.addCase(createOrder.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createOrder.fulfilled, (state, action) => {
      state.loading = false;
      state.items = [];
      state.coupon = null;
      state.shipping = 0;
      state.orderSuccess = action.payload;
    });
    builder.addCase(createOrder.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  }
});

// Selectors
export const selectCartItems = (state) => state.cart.items;
export const selectCartTotalItems = (state) => state.cart.items.reduce((total, item) => total + item.quantity, 0);
export const selectCartTotalPrice = (state) => state.cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
export const selectCartDiscount = (state) => {
  if (!state.cart.coupon) return 0;
  
  const subtotal = state.cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  
  if (state.cart.coupon.discountPercentage) {
    return (subtotal * state.cart.coupon.discountPercentage) / 100;
  } else if (state.cart.coupon.discountAmount) {
    return state.cart.coupon.discountAmount;
  }
  
  return 0;
};
export const selectCartShipping = (state) => state.cart.shipping;
export const selectCartTotal = (state) => {
  const subtotal = state.cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  const discount = selectCartDiscount(state);
  return subtotal + state.cart.shipping - discount;
};
export const selectCartLoading = (state) => state.cart.loading;
export const selectCartError = (state) => state.cart.error;
export const selectOrderSuccess = (state) => state.cart.orderSuccess;

// Actions
export const { 
  addToCart, 
  removeFromCart, 
  updateQuantity, 
  clearCart, 
  applyCoupon, 
  removeCoupon, 
  setShipping,
  resetOrderSuccess
} = cartSlice.actions;

export default cartSlice.reducer;
