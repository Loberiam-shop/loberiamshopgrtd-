// Atualização do slice de usuário para integração com backend
import { createSlice } from '@reduxjs/toolkit';
import { 
  loginUser, 
  registerUser, 
  logoutUser, 
  fetchCurrentUser, 
  updateUserProfile,
  addUserAddress,
  addUserPaymentMethod
} from '../../services/thunks';

// Estado inicial
const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  isAuthenticated: !!localStorage.getItem('token'),
  loading: false,
  error: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    // Login
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.isAuthenticated = true;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Registro
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.isAuthenticated = true;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Logout
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.user = null;
      state.isAuthenticated = false;
    });

    // Fetch Current User
    builder.addCase(fetchCurrentUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchCurrentUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
    });
    builder.addCase(fetchCurrentUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    });

    // Update Profile
    builder.addCase(updateUserProfile.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateUserProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    });
    builder.addCase(updateUserProfile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Add Address
    builder.addCase(addUserAddress.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(addUserAddress.fulfilled, (state, action) => {
      state.loading = false;
      if (!state.user.addresses) {
        state.user.addresses = [];
      }
      state.user.addresses.push(action.payload);
    });
    builder.addCase(addUserAddress.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Add Payment Method
    builder.addCase(addUserPaymentMethod.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(addUserPaymentMethod.fulfilled, (state, action) => {
      state.loading = false;
      if (!state.user.paymentMethods) {
        state.user.paymentMethods = [];
      }
      state.user.paymentMethods.push(action.payload);
    });
    builder.addCase(addUserPaymentMethod.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  }
});

// Selectors
export const selectUser = (state) => state.user.user;
export const selectIsAuthenticated = (state) => state.user.isAuthenticated;
export const selectUserLoading = (state) => state.user.loading;
export const selectUserError = (state) => state.user.error;

// Actions
export const { clearError } = userSlice.actions;

export default userSlice.reducer;
