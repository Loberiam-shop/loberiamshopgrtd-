// Componente de página inicial do e-commerce
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Button,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { 
  fetchProducts, 
  selectFeaturedProducts, 
  selectNewArrivals, 
  selectBestSellers,
  selectProductsLoading
} from '../../redux/slices/productsSlice';

// Componentes
import ProductCarousel from '../../components/product/ProductCarousel';
import CategoryGrid from '../../components/product/CategoryGrid';
import HeroBanner from '../../components/common/HeroBanner';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import PromoBanner from '../../components/common/PromoBanner';

const HomePage = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  // Selectors
  const featuredProducts = useSelector(selectFeaturedProducts);
  const newArrivals = useSelector(selectNewArrivals);
  const bestSellers = useSelector(selectBestSellers);
  const isLoading = useSelector(selectProductsLoading);
  
  // Carregar produtos ao montar o componente
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  
  // Banners para o carrossel principal
  const heroBanners = [
    {
      id: 1,
      image: '/assets/images/banners/banner1.jpg',
      title: 'Novidades em Tecnologia',
      subtitle: 'Smartphones, notebooks e acessórios com até 30% OFF',
      buttonText: 'Comprar Agora',
      buttonLink: '/categoria/eletronicos',
      align: 'left'
    },
    {
      id: 2,
      image: '/assets/images/banners/banner2.jpg',
      title: 'Moda Inverno 2025',
      subtitle: 'As últimas tendências para você arrasar na estação',
      buttonText: 'Ver Coleção',
      buttonLink: '/categoria/moda',
      align: 'right'
    },
    {
      id: 3,
      image: '/assets/images/banners/banner3.jpg',
      title: 'Decoração para sua Casa',
      subtitle: 'Renove seus ambientes com até 25% de desconto',
      buttonText: 'Explorar',
      buttonLink: '/categoria/casa-decoracao',
      align: 'center'
    }
  ];
  
  // Categorias em destaque
  const featuredCategories = [
    {
      id: 'eletronicos',
      name: 'Eletrônicos',
      image: '/assets/images/categories/eletronicos.jpg',
      link: '/categoria/eletronicos'
    },
    {
      id: 'moda',
      name: 'Moda',
      image: '/assets/images/categories/moda.jpg',
      link: '/categoria/moda'
    },
    {
      id: 'casa-decoracao',
      name: 'Casa e Decoração',
      image: '/assets/images/categories/casa-decoracao.jpg',
      link: '/categoria/casa-decoracao'
    },
    {
      id: 'esportes',
      name: 'Esportes',
      image: '/assets/images/categories/esportes.jpg',
      link: '/categoria/esportes'
    },
    {
      id: 'beleza-saude',
      name: 'Beleza e Saúde',
      image: '/assets/images/categories/beleza-saude.jpg',
      link: '/categoria/beleza-saude'
    },
    {
      id: 'infantil',
      name: 'Infantil',
      image: '/assets/images/categories/infantil.jpg',
      link: '/categoria/infantil'
    }
  ];
  
  if (isLoading) {
    return <LoadingSpinner />;
  }
  
  return (
    <Box>
      {/* Banner principal */}
      <HeroBanner banners={heroBanners} />
      
      {/* Categorias em destaque */}
      <Container maxWidth="lg" sx={{ mt: 6, mb: 6 }}>
        <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
          Categorias em Destaque
        </Typography>
        <CategoryGrid categories={featuredCategories} />
      </Container>
      
      {/* Banner promocional */}
      <PromoBanner 
        title="SUPER OFERTA RELÂMPAGO" 
        subtitle="Até 50% OFF em produtos selecionados"
        buttonText="Aproveitar"
        buttonLink="/ofertas"
        backgroundColor={theme.palette.secondary.main}
        textColor="#fff"
      />
      
      {/* Produtos em destaque */}
      <Container maxWidth="lg" sx={{ mt: 6, mb: 6 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" component="h2" sx={{ fontWeight: 600 }}>
            Produtos em Destaque
          </Typography>
          <Button 
            component={RouterLink} 
            to="/produtos/destaque" 
            variant="outlined" 
            color="primary"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            Ver Todos
          </Button>
        </Box>
        <ProductCarousel products={featuredProducts} />
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <Button 
            component={RouterLink} 
            to="/produtos/destaque" 
            variant="contained" 
            color="primary"
            sx={{ display: { xs: 'block', sm: 'none' }, width: '100%', maxWidth: '300px' }}
          >
            Ver Todos os Produtos em Destaque
          </Button>
        </Box>
      </Container>
      
      {/* Novidades */}
      <Box sx={{ backgroundColor: theme.palette.grey[100], py: 6 }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h4" component="h2" sx={{ fontWeight: 600 }}>
              Novidades
            </Typography>
            <Button 
              component={RouterLink} 
              to="/produtos/novidades" 
              variant="outlined" 
              color="primary"
              sx={{ display: { xs: 'none', sm: 'block' } }}
            >
              Ver Todos
            </Button>
          </Box>
          <ProductCarousel products={newArrivals} />
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Button 
              component={RouterLink} 
              to="/produtos/novidades" 
              variant="contained" 
              color="primary"
              sx={{ display: { xs: 'block', sm: 'none' }, width: '100%', maxWidth: '300px' }}
            >
              Ver Todas as Novidades
            </Button>
          </Box>
        </Container>
      </Box>
      
      {/* Mais vendidos */}
      <Container maxWidth="lg" sx={{ mt: 6, mb: 6 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" component="h2" sx={{ fontWeight: 600 }}>
            Mais Vendidos
          </Typography>
          <Button 
            component={RouterLink} 
            to="/produtos/mais-vendidos" 
            variant="outlined" 
            color="primary"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            Ver Todos
          </Button>
        </Box>
        <ProductCarousel products={bestSellers} />
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <Button 
            component={RouterLink} 
            to="/produtos/mais-vendidos" 
            variant="contained" 
            color="primary"
            sx={{ display: { xs: 'block', sm: 'none' }, width: '100%', maxWidth: '300px' }}
          >
            Ver Todos os Mais Vendidos
          </Button>
        </Box>
      </Container>
      
      {/* Vantagens */}
      <Box sx={{ backgroundColor: theme.palette.grey[100], py: 6 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 600, mb: 4, textAlign: 'center' }}>
            Por que escolher a Loberiam Shop?
          </Typography>
          
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ textAlign: 'center', p: 2 }}>
                <Box sx={{ fontSize: 60, color: theme.palette.primary.main, mb: 2 }}>
                  <i className="fas fa-truck"></i>
                </Box>
                <Typography variant="h6" gutterBottom>
                  Entrega Rápida
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Entregamos em todo o Brasil com rapidez e segurança
                </Typography>
              </Box>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ textAlign: 'center', p: 2 }}>
                <Box sx={{ fontSize: 60, color: theme.palette.primary.main, mb: 2 }}>
                  <i className="fas fa-shield-alt"></i>
                </Box>
                <Typography variant="h6" gutterBottom>
                  Compra Segura
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Seus dados protegidos e pagamento 100% seguro
                </Typography>
              </Box>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ textAlign: 'center', p: 2 }}>
                <Box sx={{ fontSize: 60, color: theme.palette.primary.main, mb: 2 }}>
                  <i className="fas fa-exchange-alt"></i>
                </Box>
                <Typography variant="h6" gutterBottom>
                  Troca Fácil
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Até 30 dias para trocar ou devolver seus produtos
                </Typography>
              </Box>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ textAlign: 'center', p: 2 }}>
                <Box sx={{ fontSize: 60, color: theme.palette.primary.main, mb: 2 }}>
                  <i className="fas fa-headset"></i>
                </Box>
                <Typography variant="h6" gutterBottom>
                  Atendimento
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Suporte especializado para ajudar em suas compras
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage;
