// Componente de banner promocional
import React from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Container,
  useTheme
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';

// Estilos personalizados
const PromoBannerContainer = styled(Box)(({ theme, backgroundColor }) => ({
  backgroundColor: backgroundColor || theme.palette.primary.main,
  padding: theme.spacing(4, 0),
  marginBottom: theme.spacing(4),
}));

const PromoBannerContent = styled(Container)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
}));

const PromoBanner = ({ 
  title, 
  subtitle, 
  buttonText, 
  buttonLink, 
  backgroundColor, 
  textColor 
}) => {
  const theme = useTheme();
  
  return (
    <PromoBannerContainer backgroundColor={backgroundColor}>
      <PromoBannerContent>
        <Typography 
          variant="h3" 
          component="h2" 
          sx={{ 
            fontWeight: 'bold',
            mb: 1,
            color: textColor || 'inherit',
            fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
          }}
        >
          {title}
        </Typography>
        
        <Typography 
          variant="h6" 
          sx={{ 
            mb: 3,
            color: textColor || 'inherit',
            fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' },
          }}
        >
          {subtitle}
        </Typography>
        
        <Button 
          component={RouterLink}
          to={buttonLink}
          variant="contained" 
          color="secondary"
          size="large"
          sx={{ 
            fontWeight: 'bold',
            px: 4,
            py: 1,
            backgroundColor: theme.palette.background.paper,
            color: backgroundColor || theme.palette.primary.main,
            '&:hover': {
              backgroundColor: theme.palette.background.default,
            }
          }}
        >
          {buttonText}
        </Button>
      </PromoBannerContent>
    </PromoBannerContainer>
  );
};

export default PromoBanner;
