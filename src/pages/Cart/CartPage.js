// Componente da página de carrinho de compras
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  Button, 
  IconButton, 
  TextField, 
  Divider, 
  Alert,
  Breadcrumbs,
  Link,
  useTheme,
  useMediaQuery,
  Paper
} from '@mui/material';
import { 
  Add as AddIcon, 
  Remove as RemoveIcon, 
  Delete as DeleteIcon,
  ShoppingCart as CartIcon,
  ArrowBack as ArrowBackIcon
} from '@mui/icons-material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

// Redux
import { 
  updateQuantity, 
  removeFromCart, 
  selectCartItems, 
  selectCartTotalItems, 
  selectCartTotalPrice,
  selectCartDiscount,
  selectCartShipping,
  selectCartTotal,
  applyCoupon,
  removeCoupon,
  setShipping
} from '../../redux/slices/cartSlice';
import { selectIsAuthenticated } from '../../redux/slices/userSlice';

// Componentes
import EmptyState from '../../components/ui/EmptyState';

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  // Estado local
  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');
  const [cepCode, setCepCode] = useState('');
  const [cepError, setCepError] = useState('');
  
  // Selectors
  const cartItems = useSelector(selectCartItems);
  const totalItems = useSelector(selectCartTotalItems);
  const subtotal = useSelector(selectCartTotalPrice);
  const discount = useSelector(selectCartDiscount);
  const shipping = useSelector(selectCartShipping);
  const total = useSelector(selectCartTotal);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  
  // Manipuladores de eventos
  const handleQuantityChange = (productId, newQuantity) => {
    dispatch(updateQuantity({ productId, quantity: newQuantity }));
  };
  
  const handleRemoveItem = (productId) => {
    dispatch(removeFromCart(productId));
  };
  
  const handleApplyCoupon = () => {
    if (!couponCode.trim()) {
      setCouponError('Digite um cupom válido');
      return;
    }
    
    // Simulação de cupons válidos
    if (couponCode.toUpperCase() === 'BEMVINDO10') {
      dispatch(applyCoupon({ code: couponCode, discountPercentage: 10 }));
      setCouponError('');
    } else if (couponCode.toUpperCase() === 'FRETE') {
      dispatch(applyCoupon({ code: couponCode, discountAmount: shipping }));
      setCouponError('');
    } else {
      setCouponError('Cupom inválido ou expirado');
    }
  };
  
  const handleCalculateShipping = () => {
    if (!cepCode.trim() || cepCode.length !== 8) {
      setCepError('Digite um CEP válido');
      return;
    }
    
    // Simulação de cálculo de frete
    const shippingValue = Math.floor(Math.random() * 30) + 10; // Entre 10 e 40 reais
    dispatch(setShipping(shippingValue));
    setCepError('');
  };
  
  const handleCheckout = () => {
    if (isAuthenticated) {
      navigate('/checkout');
    } else {
      navigate('/login', { state: { from: '/checkout' } });
    }
  };
  
  if (cartItems.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
          <Link component={RouterLink} to="/" color="inherit">
            Home
          </Link>
          <Typography color="text.primary">Carrinho</Typography>
        </Breadcrumbs>
        
        <EmptyState 
          icon={<CartIcon sx={{ fontSize: 60 }} />}
          title="Seu carrinho está vazio"
          description="Adicione produtos ao seu carrinho para continuar comprando."
          buttonText="Continuar Comprando"
          buttonLink="/"
        />
      </Container>
    );
  }
  
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
      {/* Breadcrumbs */}
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
        <Link component={RouterLink} to="/" color="inherit">
          Home
        </Link>
        <Typography color="text.primary">Carrinho</Typography>
      </Breadcrumbs>
      
      {/* Título */}
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
        Meu Carrinho
      </Typography>
      
      <Grid container spacing={4}>
        {/* Lista de produtos */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6">
                  {totalItems} {totalItems === 1 ? 'item' : 'itens'}
                </Typography>
                <Button 
                  component={RouterLink} 
                  to="/" 
                  startIcon={<ArrowBackIcon />}
                  color="inherit"
                >
                  Continuar Comprando
                </Button>
              </Box>
              
              <Divider sx={{ mb: 2 }} />
              
              {cartItems.map((item) => (
                <Box key={item.id} sx={{ mb: 3 }}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={3} sm={2}>
                      <Box 
                        component={RouterLink}
                        to={`/produto/${item.id}`}
                        sx={{ display: 'block' }}
                      >
                        <Box 
                          component="img"
                          src={item.image || '/assets/images/product-placeholder.jpg'}
                          alt={item.name}
                          sx={{ width: '100%', borderRadius: 1 }}
                        />
                      </Box>
                    </Grid>
                    
                    <Grid item xs={9} sm={10}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                          <Typography 
                            variant="subtitle1" 
                            component={RouterLink}
                            to={`/produto/${item.id}`}
                            sx={{ 
                              textDecoration: 'none', 
                              color: 'inherit',
                              '&:hover': { color: theme.palette.primary.main },
                              fontWeight: 500
                            }}
                          >
                            {item.name}
                          </Typography>
                        </Grid>
                        
                        <Grid item xs={6} sm={2}>
                          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                            R$ {item.price.toFixed(2)}
                          </Typography>
                        </Grid>
                        
                        <Grid item xs={6} sm={2}>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <IconButton 
                              size="small" 
                              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              <RemoveIcon fontSize="small" />
                            </IconButton>
                            
                            <Typography sx={{ mx: 1, minWidth: '20px', textAlign: 'center' }}>
                              {item.quantity}
                            </Typography>
                            
                            <IconButton 
                              size="small" 
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                              disabled={item.quantity >= item.stock}
                            >
                              <AddIcon fontSize="small" />
                            </IconButton>
                          </Box>
                        </Grid>
                        
                        <Grid item xs={6} sm={1}>
                          <Typography variant="body1" sx={{ fontWeight: 'bold', textAlign: 'right' }}>
                            R$ {(item.price * item.quantity).toFixed(2)}
                          </Typography>
                        </Grid>
                        
                        <Grid item xs={6} sm={1} sx={{ textAlign: 'right' }}>
                          <IconButton 
                            color="error" 
                            size="small"
                            onClick={() => handleRemoveItem(item.id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  
                  <Divider sx={{ mt: 2 }} />
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>
        
        {/* Resumo do pedido */}
        <Grid item xs={12} md={4}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Calcular Frete
              </Typography>
              
              <Box sx={{ display: 'flex', mb: 2 }}>
                <TextField
                  label="CEP"
                  variant="outlined"
                  size="small"
                  fullWidth
                  value={cepCode}
                  onChange={(e) => setCepCode(e.target.value.replace(/\D/g, ''))}
                  error={!!cepError}
                  helperText={cepError}
                  inputProps={{ maxLength: 8 }}
                  sx={{ mr: 1 }}
                />
                <Button 
                  variant="contained" 
                  onClick={handleCalculateShipping}
                >
                  Calcular
                </Button>
              </Box>
              
              {shipping > 0 && (
                <Alert severity="success" sx={{ mb: 2 }}>
                  Frete calculado: R$ {shipping.toFixed(2)}
                </Alert>
              )}
              
              <Typography variant="body2" color="text.secondary">
                Digite seu CEP para calcular o frete
              </Typography>
            </CardContent>
          </Card>
          
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Cupom de Desconto
              </Typography>
              
              <Box sx={{ display: 'flex', mb: 2 }}>
                <TextField
                  label="Cupom"
                  variant="outlined"
                  size="small"
                  fullWidth
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  error={!!couponError}
                  helperText={couponError}
                  sx={{ mr: 1 }}
                />
                <Button 
                  variant="contained" 
                  onClick={handleApplyCoupon}
                >
                  Aplicar
                </Button>
              </Box>
              
              {discount > 0 && (
                <Alert severity="success">
                  Cupom aplicado com sucesso! Desconto de R$ {discount.toFixed(2)}
                </Alert>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Resumo do Pedido
              </Typography>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body1">Subtotal</Typography>
                <Typography variant="body1">R$ {subtotal.toFixed(2)}</Typography>
              </Box>
              
              {discount > 0 && (
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body1">Desconto</Typography>
                  <Typography variant="body1" color="error">- R$ {discount.toFixed(2)}</Typography>
                </Box>
              )}
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="body1">Frete</Typography>
                <Typography variant="body1">
                  {shipping > 0 ? `R$ ${shipping.toFixed(2)}` : 'Calcular'}
                </Typography>
              </Box>
              
              <Divider sx={{ mb: 2 }} />
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h6">Total</Typography>
                <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
                  R$ {total.toFixed(2)}
                </Typography>
              </Box>
              
              <Button 
                variant="contained" 
                color="primary" 
                size="large" 
                fullWidth
                onClick={handleCheckout}
                disabled={!shipping}
              >
                Finalizar Compra
              </Button>
              
              {!shipping && (
                <Typography variant="body2" color="error" sx={{ mt: 1, textAlign: 'center' }}>
                  Calcule o frete para continuar
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CartPage;
