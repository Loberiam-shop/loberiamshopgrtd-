// Slice de UI para o Redux
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  notifications: [],
  modal: {
    isOpen: false,
    type: null,
    data: null
  },
  drawer: {
    isOpen: false,
    type: null
  },
  searchQuery: '',
  breadcrumbs: [],
  loading: {
    global: false,
    products: false,
    cart: false,
    checkout: false,
    user: false
  }
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    // Notificações
    addNotification: (state, action) => {
      const { id, type, message, duration } = action.payload;
      state.notifications.push({
        id: id || Date.now(),
        type: type || 'info',
        message,
        duration: duration || 5000
      });
    },
    removeNotification: (state, action) => {
      state.notifications = state.notifications.filter(
        notification => notification.id !== action.payload
      );
    },
    clearNotifications: (state) => {
      state.notifications = [];
    },
    
    // Modal
    openModal: (state, action) => {
      const { type, data } = action.payload;
      state.modal = {
        isOpen: true,
        type,
        data
      };
    },
    closeModal: (state) => {
      state.modal = {
        isOpen: false,
        type: null,
        data: null
      };
    },
    
    // Drawer
    openDrawer: (state, action) => {
      state.drawer = {
        isOpen: true,
        type: action.payload
      };
    },
    closeDrawer: (state) => {
      state.drawer = {
        isOpen: false,
        type: null
      };
    },
    
    // Pesquisa
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    clearSearchQuery: (state) => {
      state.searchQuery = '';
    },
    
    // Breadcrumbs
    setBreadcrumbs: (state, action) => {
      state.breadcrumbs = action.payload;
    },
    
    // Loading states
    setLoading: (state, action) => {
      const { key, value } = action.payload;
      state.loading[key] = value;
    }
  }
});

export const {
  addNotification,
  removeNotification,
  clearNotifications,
  openModal,
  closeModal,
  openDrawer,
  closeDrawer,
  setSearchQuery,
  clearSearchQuery,
  setBreadcrumbs,
  setLoading
} = uiSlice.actions;

export default uiSlice.reducer;

// Seletores
export const selectNotifications = (state) => state.ui.notifications;
export const selectModal = (state) => state.ui.modal;
export const selectDrawer = (state) => state.ui.drawer;
export const selectSearchQuery = (state) => state.ui.searchQuery;
export const selectBreadcrumbs = (state) => state.ui.breadcrumbs;
export const selectLoading = (state, key) => state.ui.loading[key];
