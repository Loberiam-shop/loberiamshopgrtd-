// Componente de carrossel de produtos
import React from 'react';
import { useDispatch } from 'react-redux';
import { 
  Box, 
  Card, 
  CardMedia, 
  CardContent, 
  Typography, 
  CardActions, 
  Button, 
  IconButton, 
  Rating,
  Chip,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { 
  FavoriteBorder as FavoriteBorderIcon,
  Favorite as FavoriteIcon,
  ShoppingCart as CartIcon
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { styled } from '@mui/material/styles';

import { addToCart } from '../../redux/slices/cartSlice';
import { addToFavorites, removeFromFavorites } from '../../redux/slices/productsSlice';

// Estilos personalizados
const ProductCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
  },
}));

const ProductImage = styled(CardMedia)(({ theme }) => ({
  paddingTop: '100%', // Proporção 1:1
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

const ProductContent = styled(CardContent)({
  flexGrow: 1,
  padding: '16px',
});

const ProductTitle = styled(Typography)({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  lineHeight: '1.2em',
  height: '2.4em',
});

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

const ProductCarousel = ({ products }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  
  const handleAddToCart = (product) => {
    dispatch(addToCart({ product, quantity: 1 }));
  };
  
  const handleToggleFavorite = (product) => {
    if (product.isFavorite) {
      dispatch(removeFromFavorites(product.id));
    } else {
      dispatch(addToFavorites(product.id));
    }
  };
  
  // Configurações do carrossel
  const settings = {
    dots: true,
    infinite: products.length > 4,
    speed: 500,
    slidesToShow: isMobile ? 1 : isTablet ? 2 : 4,
    slidesToScroll: isMobile ? 1 : isTablet ? 2 : 4,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };
  
  return (
    <Box sx={{ mb: 4 }}>
      <Slider {...settings}>
        {products.map((product) => (
          <Box key={product.id} sx={{ p: 1 }}>
            <ProductCard>
              <Box sx={{ position: 'relative' }}>
                <ProductImage
                  component={RouterLink}
                  to={`/produto/${product.slug}`}
                  image={product.images[0] || '/assets/images/product-placeholder.jpg'}
                  alt={product.name}
                  sx={{ textDecoration: 'none' }}
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
                
                <FavoriteButton 
                  aria-label={product.isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
                  onClick={() => handleToggleFavorite(product)}
                  size="small"
                >
                  {product.isFavorite ? (
                    <FavoriteIcon color="secondary" />
                  ) : (
                    <FavoriteBorderIcon />
                  )}
                </FavoriteButton>
              </Box>
              
              <ProductContent>
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
                >
                  {product.name}
                </ProductTitle>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, mb: 1 }}>
                  <Rating value={product.rating} precision={0.5} size="small" readOnly />
                  <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                    ({product.reviewCount})
                  </Typography>
                </Box>
                
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
              </ProductContent>
              
              <CardActions sx={{ p: 2, pt: 0 }}>
                <Button 
                  variant="contained" 
                  color="primary" 
                  fullWidth
                  startIcon={<CartIcon />}
                  onClick={() => handleAddToCart(product)}
                >
                  Adicionar
                </Button>
              </CardActions>
            </ProductCard>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default ProductCarousel;
