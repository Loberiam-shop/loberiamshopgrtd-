// Componente principal da aplicação
import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Layouts
import MainLayout from './components/common/MainLayout';

// Páginas
import HomePage from './pages/Home/HomePage';
import ProductListingPage from './pages/ProductListing/ProductListingPage';
import ProductDetailPage from './pages/ProductDetail/ProductDetailPage';
import CartPage from './pages/Cart/CartPage';
import CheckoutPage from './pages/Checkout/CheckoutPage';
import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';
import AccountPage from './pages/UserAccount/AccountPage';
import NotFoundPage from './pages/NotFound/NotFoundPage';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="categoria/:categorySlug" element={<ProductListingPage />} />
        <Route path="produto/:productSlug" element={<ProductDetailPage />} />
        <Route path="carrinho" element={<CartPage />} />
        <Route path="checkout" element={<CheckoutPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="cadastro" element={<RegisterPage />} />
        <Route path="minha-conta/*" element={<AccountPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default App;
