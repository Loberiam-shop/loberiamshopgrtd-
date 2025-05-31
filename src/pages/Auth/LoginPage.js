// Componente da página de login
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation, Link as RouterLink } from 'react-router-dom';
import { 
  Box, 
  Container, 
  Typography, 
  TextField, 
  Button, 
  Grid, 
  Link, 
  Paper, 
  Divider,
  InputAdornment,
  IconButton,
  Alert,
  Breadcrumbs,
  useTheme
} from '@mui/material';
import { 
  Visibility, 
  VisibilityOff,
  Email as EmailIcon,
  Lock as LockIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

// Redux
import { 
  loginUser, 
  selectUserLoading, 
  selectUserError,
  selectIsAuthenticated,
  clearError
} from '../../redux/slices/userSlice';

// Componentes
import LoadingButton from '../../components/ui/LoadingButton';

// Estilos personalizados
const LoginPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(6),
  },
}));

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  
  // Estado local
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  
  // Selectors
  const loading = useSelector(selectUserLoading);
  const error = useSelector(selectUserError);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  
  // Redirecionar se já estiver autenticado
  useEffect(() => {
    if (isAuthenticated) {
      const from = location.state?.from || '/minha-conta';
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);
  
  // Limpar erros ao desmontar
  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);
  
  // Validação
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError('E-mail é obrigatório');
      return false;
    } else if (!re.test(email)) {
      setEmailError('E-mail inválido');
      return false;
    } else {
      setEmailError('');
      return true;
    }
  };
  
  const validatePassword = (password) => {
    if (!password) {
      setPasswordError('Senha é obrigatória');
      return false;
    } else if (password.length < 6) {
      setPasswordError('Senha deve ter pelo menos 6 caracteres');
      return false;
    } else {
      setPasswordError('');
      return true;
    }
  };
  
  // Manipuladores de eventos
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (emailError) validateEmail(e.target.value);
  };
  
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (passwordError) validatePassword(e.target.value);
  };
  
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    
    if (isEmailValid && isPasswordValid) {
      dispatch(loginUser({ email, password }));
    }
  };
  
  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 8 }}>
      {/* Breadcrumbs */}
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
        <Link component={RouterLink} to="/" color="inherit">
          Home
        </Link>
        <Typography color="text.primary">Login</Typography>
      </Breadcrumbs>
      
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <LoginPaper elevation={3}>
            <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
              Login
            </Typography>
            
            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}
            
            <Box component="form" onSubmit={handleSubmit} noValidate>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="E-mail"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={handleEmailChange}
                error={!!emailError}
                helperText={emailError}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              />
              
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Senha"
                type={showPassword ? 'text' : 'password'}
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={handlePasswordChange}
                error={!!passwordError}
                helperText={passwordError}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon color="action" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleTogglePasswordVisibility}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              
              <Box sx={{ textAlign: 'right', mt: 1 }}>
                <Link component={RouterLink} to="/recuperar-senha" variant="body2">
                  Esqueceu sua senha?
                </Link>
              </Box>
              
              <LoadingButton
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                sx={{ mt: 3, mb: 2 }}
                loading={loading}
              >
                Entrar
              </LoadingButton>
              
              <Box sx={{ textAlign: 'center', mt: 2 }}>
                <Typography variant="body2">
                  Não tem uma conta?{' '}
                  <Link component={RouterLink} to="/cadastro">
                    Cadastre-se
                  </Link>
                </Typography>
              </Box>
            </Box>
          </LoginPaper>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
              Bem-vindo à Loberiam Shop
            </Typography>
            
            <Typography variant="body1" paragraph>
              Faça login para acessar sua conta e aproveitar:
            </Typography>
            
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Box 
                  sx={{ 
                    width: 40, 
                    height: 40, 
                    borderRadius: '50%', 
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.primary.contrastText,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mr: 2
                  }}
                >
                  <i className="fas fa-history"></i>
                </Box>
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                    Histórico de Pedidos
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Acompanhe seus pedidos e veja seu histórico de compras
                  </Typography>
                </Box>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Box 
                  sx={{ 
                    width: 40, 
                    height: 40, 
                    borderRadius: '50%', 
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.primary.contrastText,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mr: 2
                  }}
                >
                  <i className="fas fa-heart"></i>
                </Box>
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                    Lista de Favoritos
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Salve seus produtos favoritos para comprar depois
                  </Typography>
                </Box>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Box 
                  sx={{ 
                    width: 40, 
                    height: 40, 
                    borderRadius: '50%', 
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.primary.contrastText,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mr: 2
                  }}
                >
                  <i className="fas fa-truck"></i>
                </Box>
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                    Endereços Salvos
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Agilize suas compras com endereços pré-cadastrados
                  </Typography>
                </Box>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box 
                  sx={{ 
                    width: 40, 
                    height: 40, 
                    borderRadius: '50%', 
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.primary.contrastText,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mr: 2
                  }}
                >
                  <i className="fas fa-tag"></i>
                </Box>
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                    Ofertas Exclusivas
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Receba promoções e descontos exclusivos para clientes
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default LoginPage;
