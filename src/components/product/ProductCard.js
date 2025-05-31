// Componente de card de produto (versão completa)
import React from 'react';
import { useDispatch } from 'react-redux';
import { 
  Card, 
  CardMedia, 
  CardContent, 
  Typography, 
  CardActions, 
  Button, 
  IconButton, 
  Rating,
  Chip,
  Box,
  useTheme,
  Grid
} from '@mui/material';
import { 
  FavoriteBorder as FavoriteBorderIcon,
  Favorite as FavoriteIcon,
  ShoppingCart as CartIcon
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';

import { addToCart } from '../../redux/slices/cartSlice';
import { addToFavorites, removeFromFavorites } from '../../redux/slices/productsSlice';

// Estilos personalizados
const StyledCard = styled(Card)(({ theme, viewMode }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: viewMode === 'list' ? 'row' : 'column',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
  },
}));

const ProductImage = styled(CardMedia)(({ theme, viewMode }) => ({
  paddingTop: viewMode === 'list' ? '0' : '100%', // Proporção 1:1 para grid
  height: viewMode === 'list' ? '200px' : 'auto',
  width: viewMode === 'list' ? '200px' : 'auto',
  position: 'relative',
}));

const DiscountBadge = styled(Chip)(({ theme }) => ({
  position: 'absolute',
  top: 10,
  right: 10,
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.secondary.contrastText,
  fontWeight: 'bold',
}));

const NewBadge = styled(Chip)(({ theme }) => ({
  position: 'absolute',
  top: 10,
  left: 10,
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  fontWeight: 'bold',
}));

const FavoriteButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: 10,
  right: 10,
  backgroundColor: 'rgba(255,255,255,0.8)',
  '&:hover': {
    backgroundColor: 'rgba(255,255,255,0.9)',
  },
}));

const ProductContent = styled(CardContent)(({ theme, viewMode }) => ({
  flexGrow: 1,
  padding: '16px',
  width: viewMode === 'list' ? 'calc(100% - 200px)' : 'auto',
}));

const ProductTitle = styled(Typography)(({ theme, viewMode }) => ({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitLineClamp: viewMode === 'list' ? 1 : 2,
  WebkitBoxOrient: 'vertical',
  lineHeight: '1.2em',
  height: viewMode === 'list' ? '1.2em' : '2.4em',
}));

const PriceContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  marginTop: 8,
});

const OriginalPrice = styled(Typography)(({ theme }) => ({
  textDecoration: 'line-through',
  color: theme.palette.text.secondary,
  marginRight: 8,
}));

const CurrentPrice = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  color: theme.palette.primary.main,
}));

const ProductCard = ({ product, viewMode = 'grid' }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  
  const handleAddToCart = () => {
    dispatch(addToCart({ product, quantity: 1 }));
  };
  
  const handleToggleFavorite = () => {
    if (product.isFavorite) {
      dispatch(removeFromFavorites(product.id));
    } else {
      dispatch(addToFavorites(product.id));
    }
  };
  
  return (
    <StyledCard viewMode={viewMode}>
      <Box sx={{ position: 'relative' }}>
        <ProductImage
          component={RouterLink}
          to={`/produto/${product.slug}`}
          image={product.images[0] || '/assets/images/product-placeholder.jpg'}
          alt={product.name}
          sx={{ textDecoration: 'none' }}
          viewMode={viewMode}
        />
        
        {product.discountPrice && (
          <DiscountBadge 
            label={`-${Math.round(((product.price - product.discountPrice) / product.price) * 100)}%`} 
            size="small" 
          />
        )}
        
        {product.new && (
          <NewBadge label="NOVO" size="small" />
        )}
        
        {viewMode === 'grid' && (
          <FavoriteButton 
            aria-label={product.isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
            onClick={handleToggleFavorite}
            size="small"
          >
            {product.isFavorite ? (
              <FavoriteIcon color="secondary" />
            ) : (
              <FavoriteBorderIcon />
            )}
          </FavoriteButton>
        )}
      </Box>
      
      <ProductContent viewMode={viewMode}>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          {product.brand}
        </Typography>
        
        <ProductTitle 
          variant="h6" 
          component={RouterLink}
          to={`/produto/${product.slug}`}
          sx={{ 
            textDecoration: 'none', 
            color: 'inherit',
            '&:hover': { color: theme.palette.primary.main }
          }}
          viewMode={viewMode}
        >
          {product.name}
        </ProductTitle>
        
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, mb: 1 }}>
          <Rating value={product.rating} precision={0.5} size="small" readOnly />
          <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
            ({product.reviewCount})
          </Typography>
        </Box>
        
        {viewMode === 'list' && (
          <Typography 
            variant="body2" 
            color="text.secondary" 
            sx={{ 
              mt: 1, 
              mb: 2,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {product.description}
          </Typography>
        )}
        
        <PriceContainer>
          {product.discountPrice ? (
            <>
              <OriginalPrice variant="body2">
                R$ {product.price.toFixed(2)}
              </OriginalPrice>
              <CurrentPrice variant="h6">
                R$ {product.discountPrice.toFixed(2)}
              </CurrentPrice>
            </>
          ) : (
            <CurrentPrice variant="h6">
              R$ {product.price.toFixed(2)}
            </CurrentPrice>
          )}
        </PriceContainer>
        
        {viewMode === 'list' && (
          <Box sx={{ display: 'flex', mt: 2 }}>
            <Button 
              variant="contained" 
              color="primary" 
              startIcon={<CartIcon />}
              onClick={handleAddToCart}
              sx={{ mr: 1 }}
            >
              Adicionar
            </Button>
            
            <IconButton 
              aria-label={product.isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
              onClick={handleToggleFavorite}
              color={product.isFavorite ? "secondary" : "default"}
            >
              {product.isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </IconButton>
          </Box>
        )}
      </ProductContent>
      
      {viewMode === 'grid' && (
        <CardActions sx={{ p: 2, pt: 0 }}>
          <Button 
            variant="contained" 
            color="primary" 
            fullWidth
            startIcon={<CartIcon />}
            onClick={handleAddToCart}
          >
            Adicionar
          </Button>
        </CardActions>
      )}
    </StyledCard>
  );
};

export default ProductCard;
