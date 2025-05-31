// Layout principal que será compartilhado entre todas as páginas
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Container, 
  Box, 
  InputBase, 
  Badge, 
  IconButton, 
  Drawer, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemIcon, 
  Divider,
  Button,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { 
  Search as SearchIcon, 
  ShoppingCart as CartIcon, 
  Person as PersonIcon, 
  Favorite as FavoriteIcon, 
  Menu as MenuIcon,
  Home as HomeIcon,
  Category as CategoryIcon,
  LocalOffer as OfferIcon,
  NewReleases as NewIcon,
  KeyboardArrowUp as ArrowUpIcon
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

// Componentes estilizados
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
}));

const LogoContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginRight: theme.spacing(2),
}));

const LogoImage = styled('img')({
  height: 40,
  marginRight: 10
});

const SearchContainer = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: '#f1f3f4',
  '&:hover': {
    backgroundColor: '#e4e6e8',
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
  display: 'flex',
  alignItems: 'center'
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.text.secondary
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '40ch',
    },
  },
}));

const ActionIcons = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
}));

const ActionIconButton = styled(IconButton)(({ theme }) => ({
  margin: theme.spacing(0, 0.5),
  color: theme.palette.text.primary,
}));

const ActionText = styled(Typography)(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.up('sm')]: {
    display: 'block',
    fontSize: '0.8rem',
    textAlign: 'center',
  },
}));

const ActionItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  margin: theme.spacing(0, 1),
  cursor: 'pointer',
  textDecoration: 'none',
  color: 'inherit',
}));

const TopBar = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  padding: theme.spacing(0.5),
  textAlign: 'center',
  fontSize: '0.875rem',
}));

const Footer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.grey[100],
  padding: theme.spacing(6, 0),
  marginTop: 'auto',
}));

const BackToTop = styled(IconButton)(({ theme }) => ({
  position: 'fixed',
  bottom: theme.spacing(2),
  right: theme.spacing(2),
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
  zIndex: 1000,
}));

const MainLayout = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Controla a exibição do botão "voltar ao topo"
  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const menuItems = [
    { text: 'Home', icon: <HomeIcon />, path: '/' },
    { text: 'Categorias', icon: <CategoryIcon />, path: '/categorias' },
    { text: 'Ofertas', icon: <OfferIcon />, path: '/ofertas' },
    { text: 'Lançamentos', icon: <NewIcon />, path: '/lancamentos' },
  ];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Barra superior */}
      <TopBar>
        Frete grátis para compras acima de R$ 199,90 | 10% OFF na primeira compra: BEMVINDO10
      </TopBar>

      {/* Header */}
      <StyledAppBar position="sticky">
        <Toolbar>
          {isMobile && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleMobileMenu}
              sx={{ mr: 1 }}
            >
              <MenuIcon />
            </IconButton>
          )}

          <LogoContainer component={RouterLink} to="/" sx={{ textDecoration: 'none', color: 'inherit' }}>
            <LogoImage src="/assets/images/logo.png" alt="Loberiam Shop" />
            <Typography variant="h6" noWrap component="div" sx={{ display: { xs: 'none', sm: 'block' } }}>
              Loberiam Shop
            </Typography>
          </LogoContainer>

          <SearchContainer>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="O que você está procurando?"
              inputProps={{ 'aria-label': 'search' }}
            />
          </SearchContainer>

          <Box sx={{ flexGrow: 1 }} />

          <ActionIcons>
            <ActionItem component={RouterLink} to="/minha-conta">
              <ActionIconButton aria-label="conta do usuário">
                <PersonIcon />
              </ActionIconButton>
              <ActionText variant="caption">Minha Conta</ActionText>
            </ActionItem>

            <ActionItem component={RouterLink} to="/favoritos">
              <ActionIconButton aria-label="favoritos">
                <Badge badgeContent={0} color="secondary">
                  <FavoriteIcon />
                </Badge>
              </ActionIconButton>
              <ActionText variant="caption">Favoritos</ActionText>
            </ActionItem>

            <ActionItem component={RouterLink} to="/carrinho">
              <ActionIconButton aria-label="carrinho de compras">
                <Badge badgeContent={0} color="secondary">
                  <CartIcon />
                </Badge>
              </ActionIconButton>
              <ActionText variant="caption">Carrinho</ActionText>
            </ActionItem>
          </ActionIcons>
        </Toolbar>

        {/* Menu de navegação principal - visível apenas em telas maiores */}
        {!isMobile && (
          <Box sx={{ backgroundColor: theme.palette.primary.main, color: 'white' }}>
            <Container>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ display: 'flex' }}>
                  {menuItems.map((item) => (
                    <Button
                      key={item.text}
                      component={RouterLink}
                      to={item.path}
                      sx={{
                        color: 'white',
                        py: 1,
                        px: 2,
                        '&:hover': {
                          backgroundColor: theme.palette.primary.dark,
                        },
                      }}
                      startIcon={item.icon}
                    >
                      {item.text}
                    </Button>
                  ))}
                </Box>
                <Button
                  variant="contained"
                  color="secondary"
                  component={RouterLink}
                  to="/ofertas"
                  sx={{ fontWeight: 'bold' }}
                >
                  SUPER OFERTAS
                </Button>
              </Box>
            </Container>
          </Box>
        )}
      </StyledAppBar>

      {/* Menu móvel */}
      <Drawer
        anchor="left"
        open={mobileMenuOpen}
        onClose={toggleMobileMenu}
      >
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleMobileMenu}
          onKeyDown={toggleMobileMenu}
        >
          <Box sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
            <LogoImage src="/assets/images/logo.png" alt="Loberiam Shop" style={{ height: 30 }} />
            <Typography variant="h6" sx={{ ml: 1 }}>
              Loberiam Shop
            </Typography>
          </Box>
          <Divider />
          <List>
            {menuItems.map((item) => (
              <ListItem button key={item.text} component={RouterLink} to={item.path}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            <ListItem button component={RouterLink} to="/minha-conta">
              <ListItemIcon><PersonIcon /></ListItemIcon>
              <ListItemText primary="Minha Conta" />
            </ListItem>
            <ListItem button component={RouterLink} to="/favoritos">
              <ListItemIcon><FavoriteIcon /></ListItemIcon>
              <ListItemText primary="Favoritos" />
            </ListItem>
            <ListItem button component={RouterLink} to="/carrinho">
              <ListItemIcon><CartIcon /></ListItemIcon>
              <ListItemText primary="Carrinho" />
            </ListItem>
          </List>
        </Box>
      </Drawer>

      {/* Conteúdo principal */}
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Outlet />
      </Box>

      {/* Rodapé */}
      <Footer>
        <Container>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            <Box sx={{ width: { xs: '100%', sm: '48%', md: '23%' }, mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Institucional
              </Typography>
              <Typography variant="body2" component={RouterLink} to="/quem-somos" sx={{ display: 'block', mb: 1, color: 'text.secondary', textDecoration: 'none' }}>
                Quem Somos
              </Typography>
              <Typography variant="body2" component={RouterLink} to="/termos-condicoes" sx={{ display: 'block', mb: 1, color: 'text.secondary', textDecoration: 'none' }}>
                Termos e Condições
              </Typography>
              <Typography variant="body2" component={RouterLink} to="/politica-privacidade" sx={{ display: 'block', mb: 1, color: 'text.secondary', textDecoration: 'none' }}>
                Política de Privacidade
              </Typography>
              <Typography variant="body2" component={RouterLink} to="/trocas-devolucoes" sx={{ display: 'block', mb: 1, color: 'text.secondary', textDecoration: 'none' }}>
                Trocas e Devoluções
              </Typography>
            </Box>

            <Box sx={{ width: { xs: '100%', sm: '48%', md: '23%' }, mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Atendimento
              </Typography>
              <Typography variant="body2" component={RouterLink} to="/contato" sx={{ display: 'block', mb: 1, color: 'text.secondary', textDecoration: 'none' }}>
                Fale Conosco
              </Typography>
              <Typography variant="body2" component={RouterLink} to="/central-ajuda" sx={{ display: 'block', mb: 1, color: 'text.secondary', textDecoration: 'none' }}>
                Central de Ajuda
              </Typography>
              <Typography variant="body2" component={RouterLink} to="/duvidas-frequentes" sx={{ display: 'block', mb: 1, color: 'text.secondary', textDecoration: 'none' }}>
                Dúvidas Frequentes
              </Typography>
              <Typography variant="body2" component={RouterLink} to="/acompanhe-pedido" sx={{ display: 'block', mb: 1, color: 'text.secondary', textDecoration: 'none' }}>
                Acompanhe seu Pedido
              </Typography>
            </Box>

            <Box sx={{ width: { xs: '100%', sm: '48%', md: '23%' }, mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Categorias
              </Typography>
              <Typography variant="body2" component={RouterLink} to="/categoria/eletronicos" sx={{ display: 'block', mb: 1, color: 'text.secondary', textDecoration: 'none' }}>
                Eletrônicos
              </Typography>
              <Typography variant="body2" component={RouterLink} to="/categoria/moda" sx={{ display: 'block', mb: 1, color: 'text.secondary', textDecoration: 'none' }}>
                Moda
              </Typography>
              <Typography variant="body2" component={RouterLink} to="/categoria/casa-decoracao" sx={{ display: 'block', mb: 1, color: 'text.secondary', textDecoration: 'none' }}>
                Casa e Decoração
              </Typography>
              <Typography variant="body2" component={RouterLink} to="/categoria/esportes" sx={{ display: 'block', mb: 1, color: 'text.secondary', textDecoration: 'none' }}>
                Esportes
              </Typography>
              <Typography variant="body2" component={RouterLink} to="/categoria/beleza-saude" sx={{ display: 'block', mb: 1, color: 'text.secondary', textDecoration: 'none' }}>
                Beleza e Saúde
              </Typography>
            </Box>

            <Box sx={{ width: { xs: '100%', sm: '48%', md: '23%' }, mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Formas de Pagamento
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                <Box component="img" src="/assets/images/payment-visa.png" alt="Visa" sx={{ height: 30 }} />
                <Box component="img" src="/assets/images/payment-mastercard.png" alt="Mastercard" sx={{ height: 30 }} />
                <Box component="img" src="/assets/images/payment-pix.png" alt="Pix" sx={{ height: 30 }} />
                <Box component="img" src="/assets/images/payment-boleto.png" alt="Boleto" sx={{ height: 30 }} />
              </Box>

              <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                Redes Sociais
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <IconButton aria-label="Facebook" size="small">
                  <Box component="img" src="/assets/images/social-facebook.png" alt="Facebook" sx={{ height: 24 }} />
                </IconButton>
                <IconButton aria-label="Instagram" size="small">
                  <Box component="img" src="/assets/images/social-instagram.png" alt="Instagram" sx={{ height: 24 }} />
                </IconButton>
                <IconButton aria-label="Twitter" size="small">
                  <Box component="img" src="/assets/images/social-twitter.png" alt="Twitter" sx={{ height: 24 }} />
                </IconButton>
                <IconButton aria-label="YouTube" size="small">
                  <Box component="img" src="/assets/images/social-youtube.png" alt="YouTube" sx={{ height: 24 }} />
                </IconButton>
              </Box>
            </Box>
          </Box>

          <Box sx={{ borderTop: 1, borderColor: 'divider', pt: 3, mt: 3, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              © {new Date().getFullYear()} Loberiam Shop - Todos os direitos reservados
            </Typography>
          </Box>
        </Container>
      </Footer>

      {/* Botão Voltar ao Topo */}
      {showBackToTop && (
        <BackToTop onClick={handleBackToTop} aria-label="voltar ao topo">
          <ArrowUpIcon />
        </BackToTop>
      )}
    </Box>
  );
};

export default MainLayout;
