// Componente de banner hero com carrossel
import React from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Container,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { styled } from '@mui/material/styles';

// Estilos personalizados
const BannerContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  overflow: 'hidden',
  marginBottom: theme.spacing(4),
}));

const BannerSlide = styled(Box)(({ theme }) => ({
  position: 'relative',
  height: 500,
  [theme.breakpoints.down('md')]: {
    height: 400,
  },
  [theme.breakpoints.down('sm')]: {
    height: 300,
  },
}));

const BannerImage = styled(Box)(({ image }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundImage: `url(${image})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(to right, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.1) 100%)',
  },
}));

const BannerContent = styled(Container)(({ theme, align }) => ({
  position: 'relative',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  color: '#fff',
  zIndex: 1,
  textAlign: align === 'center' ? 'center' : 'left',
  alignItems: align === 'center' ? 'center' : 'flex-start',
  [theme.breakpoints.down('sm')]: {
    textAlign: 'center',
    alignItems: 'center',
  },
}));

const HeroBanner = ({ banners }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  // Configurações do carrossel
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    arrows: !isMobile,
  };
  
  return (
    <BannerContainer>
      <Slider {...settings}>
        {banners.map((banner) => (
          <BannerSlide key={banner.id}>
            <BannerImage image={banner.image} />
            <BannerContent align={banner.align}>
              <Typography 
                variant="h2" 
                component="h1" 
                sx={{ 
                  fontWeight: 'bold',
                  mb: 2,
                  fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                  textShadow: '1px 1px 3px rgba(0,0,0,0.3)'
                }}
              >
                {banner.title}
              </Typography>
              
              <Typography 
                variant="h5" 
                sx={{ 
                  mb: 3,
                  maxWidth: '600px',
                  fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' },
                  textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
                }}
              >
                {banner.subtitle}
              </Typography>
              
              <Button 
                component={RouterLink}
                to={banner.buttonLink}
                variant="contained" 
                color="secondary"
                size="large"
                sx={{ 
                  fontWeight: 'bold',
                  px: 4,
                  py: 1
                }}
              >
                {banner.buttonText}
              </Button>
            </BannerContent>
          </BannerSlide>
        ))}
      </Slider>
    </BannerContainer>
  );
};

export default HeroBanner;
