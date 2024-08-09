import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import MediaCard from './card.js';
import IconButton from '@mui/material/IconButton';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import Button from '@mui/material/Button';
import { Container, Grid, Typography, Pagination, Box } from '@mui/material';
import FavoritesIcon from './favoritIcons.js';
import { useDispatch } from 'react-redux'; 
import { addToFavorites } from '../../redux/Actions/actionFavo.js'; 
import '../../styles/CSS/home.css';

function Home() {
    const [productData, setProductData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;

    const dispatch = useDispatch();
    useEffect(() => {
        axios.get("https://fakestoreapi.com/products")
            .then((res) => setProductData(res.data))
            .catch((err) => console.log(err));
    }, []);

    const indexOfLastProduct = currentPage * itemsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
    const currentProducts = productData.slice(indexOfFirstProduct, indexOfLastProduct);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const handleAddToFavorites = (product) => {
        dispatch(addToFavorites(product)); 
    };

    return (
        <Container className='container'>
            <Typography variant="h4" align="center" gutterBottom>
                List of Products
            </Typography>
            <Grid container spacing={3}>
                {currentProducts.length === 0 ? (
                    <Typography variant="h6" align="center" gutterBottom>
                        Not Found
                    </Typography>
                ) : (
                    currentProducts.map(product => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                        <MediaCard
                            image={product.image}
                            title={product.title}
                            // price={product.price}  
                            // description={product.description} 
                            >
                            <FavoritesIcon product={product} />  
                            <IconButton aria-label="add to bookmark" className='icone'>
                            <BookmarkBorderIcon />
                            </IconButton>
                            <Button 
                            variant="contained" 
                            sx={{ backgroundColor: 'rgba(212, 193, 108, 0.87)', color: '#ffffff' }} 
                            component={Link} 
                            to={`/details/${product.id}`}
                            >
                            More Details
                            </Button>
                        </MediaCard>
                        </Grid>

                    ))
                )}
            </Grid>
            <Box my={3} display="flex" justifyContent="center">
                <Pagination
                    count={Math.ceil(productData.length / itemsPerPage)}
                    page={currentPage}
                    onChange={handlePageChange}
                    color="warning"
                />
            </Box>
        </Container>
    );
}

export default Home;
