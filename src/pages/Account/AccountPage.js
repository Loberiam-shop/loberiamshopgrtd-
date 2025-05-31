// Componente da página de painel do usuário (Minha Conta)
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Paper, 
  Tabs, 
  Tab, 
  Divider, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText,
  ListItemButton,
  Avatar,
  Button,
  Card,
  CardContent,
  TextField,
  Alert,
  Breadcrumbs,
  Link,
  useTheme,
  useMediaQuery,
  Badge
} from '@mui/material';
import { 
  Person as PersonIcon,
  ShoppingBag as OrdersIcon,
  Favorite as FavoriteIcon,
  LocationOn as AddressIcon,
  CreditCard as PaymentIcon,
  Notifications as NotificationsIcon,
  Security as SecurityIcon,
  ExitToApp as LogoutIcon
} from '@mui/icons-material';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';

// Redux
import { 
  selectUser, 
  selectIsAuthenticated,
  logoutUser,
  updateUserProfile
} from '../../redux/slices/userSlice';
import { selectFavoriteProducts } from '../../redux/slices/productsSlice';
import { selectUserOrders } from '../../redux/slices/ordersSlice';

// Componentes
import OrderCard from '../../components/user/OrderCard';
import AddressCard from '../../components/user/AddressCard';
import PaymentMethodCard from '../../components/user/PaymentMethodCard';
import ProductCard from '../../components/product/ProductCard';
import LoadingButton from '../../components/ui/LoadingButton';

const AccountPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  // Estado local
  const [activeTab, setActiveTab] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    birthDate: ''
  });
  const [formErrors, setFormErrors] = useState({});
  
  // Selectors
  const user = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const favoriteProducts = useSelector(selectFavoriteProducts);
  const orders = useSelector(selectUserOrders);
  
  // Redirecionar se não estiver autenticado
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: location.pathname } });
    }
  }, [isAuthenticated, navigate, location]);
  
  // Inicializar dados do formulário
  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: user.phone || '',
        birthDate: user.birthDate || ''
      });
    }
  }, [user]);
  
  // Determinar a aba ativa com base na URL
  useEffect(() => {
    const path = location.pathname;
    if (path.includes('/pedidos')) {
      setActiveTab(1);
    } else if (path.includes('/favoritos')) {
      setActiveTab(2);
    } else if (path.includes('/enderecos')) {
      setActiveTab(3);
    } else if (path.includes('/pagamentos')) {
      setActiveTab(4);
    } else if (path.includes('/notificacoes')) {
      setActiveTab(5);
    } else if (path.includes('/seguranca')) {
      setActiveTab(6);
    } else {
      setActiveTab(0);
    }
  }, [location]);
  
  // Manipuladores de eventos
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    
    // Navegar para a URL correspondente
    switch (newValue) {
      case 0:
        navigate('/minha-conta');
        break;
      case 1:
        navigate('/minha-conta/pedidos');
        break;
      case 2:
        navigate('/minha-conta/favoritos');
        break;
      case 3:
        navigate('/minha-conta/enderecos');
        break;
      case 4:
        navigate('/minha-conta/pagamentos');
        break;
      case 5:
        navigate('/minha-conta/notificacoes');
        break;
      case 6:
        navigate('/minha-conta/seguranca');
        break;
      default:
        navigate('/minha-conta');
    }
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Limpar erro do campo
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ''
      });
    }
  };
  
  const handleEditToggle = () => {
    setEditMode(!editMode);
    
    // Se estiver saindo do modo de edição, resetar o formulário
    if (editMode) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: user.phone || '',
        birthDate: user.birthDate || ''
      });
      setFormErrors({});
    }
  };
  
  const validateForm = () => {
    const errors = {};
    
    if (!formData.firstName.trim()) {
      errors.firstName = 'Nome é obrigatório';
    }
    
    if (!formData.lastName.trim()) {
      errors.lastName = 'Sobrenome é obrigatório';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'E-mail é obrigatório';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        errors.email = 'E-mail inválido';
      }
    }
    
    if (formData.phone && !/^\d{10,11}$/.test(formData.phone.replace(/\D/g, ''))) {
      errors.phone = 'Telefone inválido';
    }
    
    return errors;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    // Atualizar perfil
    dispatch(updateUserProfile(formData));
    setEditMode(false);
  };
  
  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/');
  };
  
  // Renderizar conteúdo da aba
  const renderTabContent = () => {
    switch (activeTab) {
      case 0: // Perfil
        return (
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6">Dados Pessoais</Typography>
                <Button 
                  variant={editMode ? "outlined" : "contained"} 
                  color={editMode ? "secondary" : "primary"}
                  onClick={handleEditToggle}
                >
                  {editMode ? "Cancelar" : "Editar"}
                </Button>
              </Box>
              
              {editMode ? (
                <Box component="form" onSubmit={handleSubmit}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Nome"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        error={!!formErrors.firstName}
                        helperText={formErrors.firstName}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Sobrenome"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        error={!!formErrors.lastName}
                        helperText={formErrors.lastName}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="E-mail"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        error={!!formErrors.email}
                        helperText={formErrors.email}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Telefone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        error={!!formErrors.phone}
                        helperText={formErrors.phone}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Data de Nascimento"
                        name="birthDate"
                        type="date"
                        value={formData.birthDate}
                        onChange={handleInputChange}
                        InputLabelProps={{ shrink: true }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <LoadingButton
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        loading={false}
                      >
                        Salvar Alterações
                      </LoadingButton>
                    </Grid>
                  </Grid>
                </Box>
              ) : (
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" color="text.secondary">Nome</Typography>
                    <Typography variant="body1">{user?.firstName || '-'}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" color="text.secondary">Sobrenome</Typography>
                    <Typography variant="body1">{user?.lastName || '-'}</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle2" color="text.secondary">E-mail</Typography>
                    <Typography variant="body1">{user?.email || '-'}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" color="text.secondary">Telefone</Typography>
                    <Typography variant="body1">{user?.phone || '-'}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" color="text.secondary">Data de Nascimento</Typography>
                    <Typography variant="body1">
                      {user?.birthDate ? new Date(user.birthDate).toLocaleDateString() : '-'}
                    </Typography>
                  </Grid>
                </Grid>
              )}
            </CardContent>
          </Card>
        );
      
      case 1: // Pedidos
        return (
          <Box>
            <Typography variant="h6" gutterBottom>Meus Pedidos</Typography>
            
            {orders.length === 0 ? (
              <Alert severity="info" sx={{ mt: 2 }}>
                Você ainda não realizou nenhum pedido.
              </Alert>
            ) : (
              <Grid container spacing={3}>
                {orders.map(order => (
                  <Grid item xs={12} key={order.id}>
                    <OrderCard order={order} />
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>
        );
      
      case 2: // Favoritos
        return (
          <Box>
            <Typography variant="h6" gutterBottom>Meus Favoritos</Typography>
            
            {favoriteProducts.length === 0 ? (
              <Alert severity="info" sx={{ mt: 2 }}>
                Você ainda não adicionou produtos aos favoritos.
              </Alert>
            ) : (
              <Grid container spacing={3}>
                {favoriteProducts.map(product => (
                  <Grid item xs={12} sm={6} md={4} key={product.id}>
                    <ProductCard product={product} />
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>
        );
      
      case 3: // Endereços
        return (
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6">Meus Endereços</Typography>
              <Button 
                variant="contained" 
                color="primary"
              >
                Adicionar Endereço
              </Button>
            </Box>
            
            {user?.addresses?.length === 0 ? (
              <Alert severity="info">
                Você ainda não cadastrou nenhum endereço.
              </Alert>
            ) : (
              <Grid container spacing={3}>
                {user?.addresses?.map(address => (
                  <Grid item xs={12} sm={6} key={address.id}>
                    <AddressCard address={address} />
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>
        );
      
      case 4: // Métodos de Pagamento
        return (
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6">Métodos de Pagamento</Typography>
              <Button 
                variant="contained" 
                color="primary"
              >
                Adicionar Cartão
              </Button>
            </Box>
            
            {user?.paymentMethods?.length === 0 ? (
              <Alert severity="info">
                Você ainda não cadastrou nenhum método de pagamento.
              </Alert>
            ) : (
              <Grid container spacing={3}>
                {user?.paymentMethods?.map(method => (
                  <Grid item xs={12} sm={6} key={method.id}>
                    <PaymentMethodCard method={method} />
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>
        );
      
      case 5: // Notificações
        return (
          <Box>
            <Typography variant="h6" gutterBottom>Preferências de Notificação</Typography>
            
            <Card>
              <CardContent>
                <List>
                  <ListItem>
                    <ListItemText 
                      primary="Notificações por E-mail" 
                      secondary="Receba atualizações sobre seus pedidos, ofertas e novidades"
                    />
                    <Button variant="outlined">
                      {user?.preferences?.emailNotifications ? "Desativar" : "Ativar"}
                    </Button>
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemText 
                      primary="Notificações por SMS" 
                      secondary="Receba atualizações sobre seus pedidos via SMS"
                    />
                    <Button variant="outlined">
                      {user?.preferences?.smsNotifications ? "Desativar" : "Ativar"}
                    </Button>
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemText 
                      primary="Newsletter" 
                      secondary="Receba ofertas exclusivas e novidades da loja"
                    />
                    <Button variant="outlined">
                      {user?.preferences?.newsletter ? "Desativar" : "Ativar"}
                    </Button>
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Box>
        );
      
      case 6: // Segurança
        return (
          <Box>
            <Typography variant="h6" gutterBottom>Segurança da Conta</Typography>
            
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="subtitle1" gutterBottom>Alterar Senha</Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Recomendamos alterar sua senha regularmente para manter sua conta segura.
                </Typography>
                <Button variant="contained" color="primary">
                  Alterar Senha
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent>
                <Typography variant="subtitle1" gutterBottom>Verificação em Duas Etapas</Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Adicione uma camada extra de segurança à sua conta.
                </Typography>
                <Button variant="outlined">
                  {user?.security?.twoFactorEnabled ? "Desativar" : "Ativar"}
                </Button>
              </CardContent>
            </Card>
          </Box>
        );
      
      default:
        return null;
    }
  };
  
  if (!user) {
    return null; // Será redirecionado pelo useEffect
  }
  
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
      {/* Breadcrumbs */}
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
        <Link component={RouterLink} to="/" color="inherit">
          Home
        </Link>
        <Typography color="text.primary">Minha Conta</Typography>
      </Breadcrumbs>
      
      {/* Título */}
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
        Minha Conta
      </Typography>
      
      <Grid container spacing={4}>
        {/* Menu lateral para desktop */}
        {!isMobile && (
          <Grid item xs={12} md={3}>
            <Paper sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Avatar 
                  sx={{ 
                    width: 64, 
                    height: 64, 
                    bgcolor: theme.palette.primary.main,
                    mr: 2
                  }}
                >
                  {user.firstName ? user.firstName.charAt(0) : 'U'}
                </Avatar>
                <Box>
                  <Typography variant="h6">
                    {user.firstName ? `${user.firstName} ${user.lastName}` : 'Usuário'}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {user.email}
                  </Typography>
                </Box>
              </Box>
              
              <Divider sx={{ mb: 2 }} />
              
              <List component="nav">
                <ListItemButton 
                  selected={activeTab === 0}
                  onClick={() => handleTabChange(null, 0)}
                >
                  <ListItemIcon>
                    <PersonIcon />
                  </ListItemIcon>
                  <ListItemText primary="Meu Perfil" />
                </ListItemButton>
                
                <ListItemButton 
                  selected={activeTab === 1}
                  onClick={() => handleTabChange(null, 1)}
                >
                  <ListItemIcon>
                    <OrdersIcon />
                  </ListItemIcon>
                  <ListItemText primary="Meus Pedidos" />
                </ListItemButton>
                
                <ListItemButton 
                  selected={activeTab === 2}
                  onClick={() => handleTabChange(null, 2)}
                >
                  <ListItemIcon>
                    <FavoriteIcon />
                  </ListItemIcon>
                  <ListItemText primary="Favoritos" />
                  {favoriteProducts.length > 0 && (
                    <Badge badgeContent={favoriteProducts.length} color="primary" />
                  )}
                </ListItemButton>
                
                <ListItemButton 
                  selected={activeTab === 3}
                  onClick={() => handleTabChange(null, 3)}
                >
                  <ListItemIcon>
                    <AddressIcon />
                  </ListItemIcon>
                  <ListItemText primary="Endereços" />
                </ListItemButton>
                
                <ListItemButton 
                  selected={activeTab === 4}
                  onClick={() => handleTabChange(null, 4)}
                >
                  <ListItemIcon>
                    <PaymentIcon />
                  </ListItemIcon>
                  <ListItemText primary="Pagamentos" />
                </ListItemButton>
                
                <ListItemButton 
                  selected={activeTab === 5}
                  onClick={() => handleTabChange(null, 5)}
                >
                  <ListItemIcon>
                    <NotificationsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Notificações" />
                </ListItemButton>
                
                <ListItemButton 
                  selected={activeTab === 6}
                  onClick={() => handleTabChange(null, 6)}
                >
                  <ListItemIcon>
                    <SecurityIcon />
                  </ListItemIcon>
                  <ListItemText primary="Segurança" />
                </ListItemButton>
                
                <Divider sx={{ my: 1 }} />
                
                <ListItemButton onClick={handleLogout}>
                  <ListItemIcon>
                    <LogoutIcon />
                  </ListItemIcon>
                  <ListItemText primary="Sair" />
                </ListItemButton>
              </List>
            </Paper>
          </Grid>
        )}
        
        {/* Conteúdo principal */}
        <Grid item xs={12} md={isMobile ? 12 : 9}>
          {/* Tabs para mobile */}
          {isMobile && (
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              variant="scrollable"
              scrollButtons="auto"
              sx={{ mb: 3 }}
            >
              <Tab icon={<PersonIcon />} label="Perfil" />
              <Tab icon={<OrdersIcon />} label="Pedidos" />
              <Tab icon={<FavoriteIcon />} label="Favoritos" />
              <Tab icon={<AddressIcon />} label="Endereços" />
              <Tab icon={<PaymentIcon />} label="Pagamentos" />
              <Tab icon={<NotificationsIcon />} label="Notificações" />
              <Tab icon={<SecurityIcon />} label="Segurança" />
            </Tabs>
          )}
          
          {/* Conteúdo da aba selecionada */}
          <Paper sx={{ p: 3 }}>
            {renderTabContent()}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AccountPage;
