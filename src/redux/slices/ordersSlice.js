// Slice de pedidos para integração com backend
import { createSlice } from '@reduxjs/toolkit';
import { 
  fetchUserOrders,
  fetchOrderById,
  createOrder
} from '../../services/thunks';

// Estado inicial
const initialState = {
  orders: [],
  currentOrder: null,
  loading: false,
  error: null
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearCurrentOrder: (state) => {
      state.currentOrder = null;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    // Fetch User Orders
    builder.addCase(fetchUserOrders.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchUserOrders.fulfilled, (state, action) => {
      state.loading = false;
      state.orders = action.payload;
    });
    builder.addCase(fetchUserOrders.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Fetch Order By ID
    builder.addCase(fetchOrderById.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchOrderById.fulfilled, (state, action) => {
      state.loading = false;
      state.currentOrder = action.payload;
    });
    builder.addCase(fetchOrderById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Create Order
    builder.addCase(createOrder.fulfilled, (state, action) => {
      state.orders.unshift(action.payload);
      state.currentOrder = action.payload;
    });
  }
});

// Selectors
export const selectUserOrders = (state) => state.orders.orders;
export const selectCurrentOrder = (state) => state.orders.currentOrder;
export const selectOrdersLoading = (state) => state.orders.loading;
export const selectOrdersError = (state) => state.orders.error;

// Actions
export const { clearCurrentOrder, clearError } = ordersSlice.actions;

export default ordersSlice.reducer;
