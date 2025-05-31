// Componente de página de listagem de produtos
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useLocation } from 'react-router-dom';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Divider,
  Button,
  Breadcrumbs,
  Link,
  Pagination,
  useTheme,
  useMediaQuery,
  Drawer,
  IconButton
} from '@mui/material';
import { 
  FilterList as FilterIcon,
  GridView as GridViewIcon,
  ViewList as ListViewIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

// Redux
import { 
  fetchProductsByCategory, 
  selectProductsByCategory,
  selectProductsLoading,
  selectProductsError,
  setFilters,
  resetFilters,
  selectFilters
} from '../../redux/slices/productsSlice';

// Componentes
import ProductCard from '../../components/product/ProductCard';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import ErrorMessage from '../../components/ui/ErrorMessage';

const ProductListingPage = () => {
  const { categorySlug } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  // Estado local
  const [page, setPage] = useState(1);
  const [viewMode, setViewMode] = useState('grid');
  const [filtersOpen, setFiltersOpen] = useState(!isMobile);
  
  // Selectors
  const products = useSelector(state => selectProductsByCategory(state, categorySlug));
  const loading = useSelector(selectProductsLoading);
  const error = useSelector(selectProductsError);
  const filters = useSelector(selectFilters);
  
  // Carregar produtos ao montar o componente ou quando a categoria muda
  useEffect(() => {
    dispatch(fetchProductsByCategory(categorySlug));
    setPage(1);
  }, [dispatch, categorySlug]);
  
  // Resetar filtros quando mudar de categoria
  useEffect(() => {
    dispatch(resetFilters());
  }, [dispatch, categorySlug]);
  
  // Determinar o título da categoria
  const getCategoryTitle = () => {
    switch(categorySlug) {
      case 'eletronicos':
        return 'Eletrônicos';
      case 'moda':
        return 'Moda';
      case 'casa-decoracao':
        return 'Casa e Decoração';
      case 'esportes':
        return 'Esportes';
      case 'beleza-saude':
        return 'Beleza e Saúde';
      case 'infantil':
        return 'Infantil';
      default:
        return 'Produtos';
    }
  };
  
  // Manipuladores de eventos
  const handleSortChange = (event) => {
    dispatch(setFilters({ sortBy: event.target.value }));
  };
  
  const handlePriceRangeChange = (event, newValue) => {
    dispatch(setFilters({ priceRange: newValue }));
  };
  
  const handleBrandChange = (event) => {
    const { value, checked } = event.target;
    const updatedBrands = checked 
      ? [...filters.brands, value]
      : filters.brands.filter(brand => brand !== value);
    
    dispatch(setFilters({ brands: updatedBrands }));
  };
  
  const handleRatingChange = (event) => {
    const { value, checked } = event.target;
    dispatch(setFilters({ ratings: checked ? parseInt(value) : null }));
  };
  
  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleViewModeChange = (mode) => {
    setViewMode(mode);
  };
  
  const toggleFilters = () => {
    setFiltersOpen(!filtersOpen);
  };
  
  // Aplicar filtros aos produtos
  const applyFilters = (products) => {
    if (!products) return [];
    
    let filteredProducts = [...products];
    
    // Filtrar por preço
    filteredProducts = filteredProducts.filter(product => {
      const price = product.discountPrice || product.price;
      return price >= filters.priceRange[0] && price <= filters.priceRange[1];
    });
    
    // Filtrar por marca
    if (filters.brands.length > 0) {
      filteredProducts = filteredProducts.filter(product => 
        filters.brands.includes(product.brand)
      );
    }
    
    // Filtrar por avaliação
    if (filters.ratings !== null) {
      filteredProducts = filteredProducts.filter(product => 
        product.rating >= filters.ratings
      );
    }
    
    // Ordenar produtos
    switch (filters.sortBy) {
      case 'price_asc':
        filteredProducts.sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price));
        break;
      case 'price_desc':
        filteredProducts.sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price));
        break;
      case 'newest':
        filteredProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'rating':
        filteredProducts.sort((a, b) => b.rating - a.rating);
        break;
      case 'popularity':
        filteredProducts.sort((a, b) => b.salesCount - a.salesCount);
        break;
      default:
        // Relevância (padrão)
        break;
    }
    
    return filteredProducts;
  };
  
  // Paginação
  const ITEMS_PER_PAGE = 12;
  const filteredProducts = applyFilters(products);
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );
  
  // Extrair marcas únicas para o filtro
  const uniqueBrands = products ? [...new Set(products.map(product => product.brand))] : [];
  
  // Encontrar o preço mínimo e máximo para o slider
  const minPrice = products ? Math.min(...products.map(product => product.discountPrice || product.price)) : 0;
  const maxPrice = products ? Math.max(...products.map(product => product.discountPrice || product.price)) : 10000;
  
  // Renderizar filtros
  const renderFilters = () => (
    <Box sx={{ p: 2 }}>
      {isMobile && (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">Filtros</Typography>
          <IconButton onClick={toggleFilters}>
            <CloseIcon />
          </IconButton>
        </Box>
      )}
      
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
          Preço
        </Typography>
        <Box sx={{ px: 1 }}>
          <Slider
            value={filters.priceRange}
            onChange={handlePriceRangeChange}
            valueLabelDisplay="auto"
            min={minPrice}
            max={maxPrice}
            valueLabelFormat={(value) => `R$ ${value}`}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
            <Typography variant="body2">
              R$ {filters.priceRange[0]}
            </Typography>
            <Typography variant="body2">
              R$ {filters.priceRange[1]}
            </Typography>
          </Box>
        </Box>
      </Box>
      
      <Divider sx={{ my: 2 }} />
      
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
          Marcas
        </Typography>
        <FormGroup>
          {uniqueBrands.map(brand => (
            <FormControlLabel
              key={brand}
              control={
                <Checkbox
                  checked={filters.brands.includes(brand)}
                  onChange={handleBrandChange}
                  value={brand}
                  size="small"
                />
              }
              label={brand}
            />
          ))}
        </FormGroup>
      </Box>
      
      <Divider sx={{ my: 2 }} />
      
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
          Avaliação
        </Typography>
        <FormGroup>
          {[5, 4, 3, 2, 1].map(rating => (
            <FormControlLabel
              key={rating}
              control={
                <Checkbox
                  checked={filters.ratings === rating}
                  onChange={handleRatingChange}
                  value={rating}
                  size="small"
                />
              }
              label={`${rating} estrelas ou mais`}
            />
          ))}
        </FormGroup>
      </Box>
      
      <Button 
        variant="outlined" 
        color="primary" 
        fullWidth
        onClick={() => dispatch(resetFilters())}
      >
        Limpar Filtros
      </Button>
    </Box>
  );
  
  if (loading) {
    return <LoadingSpinner />;
  }
  
  if (error) {
    return <ErrorMessage message={error} />;
  }
  
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
      {/* Breadcrumbs */}
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
        <Link component={RouterLink} to="/" color="inherit">
          Home
        </Link>
        <Typography color="text.primary">{getCategoryTitle()}</Typography>
      </Breadcrumbs>
      
      {/* Título da categoria */}
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
        {getCategoryTitle()}
      </Typography>
      
      <Grid container spacing={3}>
        {/* Filtros para desktop */}
        {!isMobile && (
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                {renderFilters()}
              </CardContent>
            </Card>
          </Grid>
        )}
        
        {/* Lista de produtos */}
        <Grid item xs={12} md={isMobile ? 12 : 9}>
          {/* Barra de controles */}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            mb: 3,
            flexDirection: { xs: 'column', sm: 'row' },
            gap: { xs: 2, sm: 0 }
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="body1" sx={{ mr: 1 }}>
                {filteredProducts.length} produtos encontrados
              </Typography>
            </Box>
            
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center',
              width: { xs: '100%', sm: 'auto' },
              justifyContent: { xs: 'space-between', sm: 'flex-end' }
            }}>
              {isMobile && (
                <Button 
                  variant="outlined" 
                  startIcon={<FilterIcon />}
                  onClick={toggleFilters}
                  sx={{ mr: 2 }}
                >
                  Filtros
                </Button>
              )}
              
              <FormControl size="small" sx={{ minWidth: 150 }}>
                <InputLabel id="sort-select-label">Ordenar por</InputLabel>
                <Select
                  labelId="sort-select-label"
                  id="sort-select"
                  value={filters.sortBy}
                  label="Ordenar por"
                  onChange={handleSortChange}
                >
                  <MenuItem value="relevance">Relevância</MenuItem>
                  <MenuItem value="price_asc">Menor Preço</MenuItem>
                  <MenuItem value="price_desc">Maior Preço</MenuItem>
                  <MenuItem value="newest">Mais Recentes</MenuItem>
                  <MenuItem value="rating">Melhor Avaliados</MenuItem>
                  <MenuItem value="popularity">Mais Vendidos</MenuItem>
                </Select>
              </FormControl>
              
              <Box sx={{ display: 'flex', ml: 2 }}>
                <IconButton 
                  color={viewMode === 'grid' ? 'primary' : 'default'}
                  onClick={() => handleViewModeChange('grid')}
                >
                  <GridViewIcon />
                </IconButton>
                <IconButton 
                  color={viewMode === 'list' ? 'primary' : 'default'}
                  onClick={() => handleViewModeChange('list')}
                >
                  <ListViewIcon />
                </IconButton>
              </Box>
            </Box>
          </Box>
          
          {/* Produtos */}
          {paginatedProducts.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography variant="h6" gutterBottom>
                Nenhum produto encontrado
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Tente ajustar seus filtros ou buscar por outra categoria.
              </Typography>
            </Box>
          ) : (
            <Grid container spacing={3}>
              {paginatedProducts.map(product => (
                <Grid 
                  item 
                  key={product.id} 
                  xs={12} 
                  sm={viewMode === 'grid' ? 6 : 12} 
                  md={viewMode === 'grid' ? 4 : 12}
                >
                  <ProductCard product={product} viewMode={viewMode} />
                </Grid>
              ))}
            </Grid>
          )}
          
          {/* Paginação */}
          {totalPages > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Pagination 
                count={totalPages} 
                page={page} 
                onChange={handlePageChange} 
                color="primary"
                size={isMobile ? "small" : "medium"}
              />
            </Box>
          )}
        </Grid>
      </Grid>
      
      {/* Drawer de filtros para mobile */}
      {isMobile && (
        <Drawer
          anchor="left"
          open={filtersOpen}
          onClose={toggleFilters}
        >
          <Box sx={{ width: 280 }}>
            {renderFilters()}
          </Box>
        </Drawer>
      )}
    </Container>
  );
};

export default ProductListingPage;
