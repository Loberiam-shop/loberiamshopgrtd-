// Componente de grid de categorias
import React from 'react';
import { 
  Grid, 
  Card, 
  CardMedia, 
  CardContent, 
  Typography, 
  Box,
  useTheme
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';

// Estilos personalizados
const CategoryCard = styled(Card)(({ theme }) => ({
  height: '100%',
  position: 'relative',
  overflow: 'hidden',
  borderRadius: theme.shape.borderRadius,
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'scale(1.03)',
  },
}));

const CategoryImage = styled(CardMedia)(({ theme }) => ({
  height: 180,
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.6) 100%)',
  },
}));

const CategoryContent = styled(CardContent)(({ theme }) => ({
  position: 'absolute',
  bottom: 0,
  width: '100%',
  padding: theme.spacing(2),
  color: '#fff',
  textAlign: 'center',
}));

const CategoryGrid = ({ categories }) => {
  const theme = useTheme();
  
  return (
    <Grid container spacing={3}>
      {categories.map((category) => (
        <Grid item xs={6} sm={4} md={4} key={category.id}>
          <Box 
            component={RouterLink} 
            to={category.link} 
            sx={{ 
              textDecoration: 'none',
              display: 'block',
              height: '100%'
            }}
          >
            <CategoryCard>
              <CategoryImage
                image={category.image}
                alt={category.name}
              />
              <CategoryContent>
                <Typography variant="h6" component="h3" sx={{ fontWeight: 'bold' }}>
                  {category.name}
                </Typography>
              </CategoryContent>
            </CategoryCard>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default CategoryGrid;
