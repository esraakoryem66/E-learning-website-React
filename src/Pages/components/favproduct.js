import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromFavorites } from '../../redux/Actions/actionFavo.js';
import { Typography, Card, CardContent, CardMedia, Box, Rating, Grid, Button } from '@mui/material';
import '../../styles/CSS/favproduct.css';

const FavoritesPage = () => {
  const favorites = useSelector(state => state.favorites.favorites);
  const dispatch = useDispatch();

  return (
    <Grid container spacing={3} padding={3}>
        <Grid item xs={12}>
            <Typography variant="h4" align="center" gutterBottom>
                Favorite Products
            </Typography>
        </Grid>
        {favorites.length === 0 ? (
            <Grid item xs={12}>
                <Typography align="center">No favorites yet!</Typography>
            </Grid>
        ) : (
            favorites.map(product => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                    <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth:'100',maxHeight:'auto' }}>
                        <CardMedia
                            component="img"
                            height="250"
                            width="100"
                            image={product.image}
                            alt={product.title}
                        />
                        <CardContent sx={{ textAlign: 'center' }}>
                            <Typography gutterBottom variant="h5" component="div">
                                {product.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 2 }}>
                                {product.description}
                            </Typography>
                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Rating name="read-only" value={product.rating ? product.rating.rate : 0} readOnly />
                            </Box>
                        </CardContent>
                        <Button onClick={() => dispatch(removeFromFavorites(product.id))} variant="contained" color="primary">
                           Remove
                        </Button>
                    </Card>
                </Grid>
            ))
        )}
    </Grid>
  );
};

export default FavoritesPage;
