import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Typography, Card, CardContent, CardMedia, Box, Rating } from '@mui/material';

function ProductDetails() {
    const params = useParams();
    console.log("Product ID from params:", params.id);

    const [detailsProduct, setDetailsProduct] = useState({});

    useEffect(() => {
        axios.get(`https://fakestoreapi.com/products/${params.id}`)
            .then((res) => setDetailsProduct(res.data))
            .catch((err) => console.log(err));
    }, [params.id]);

    return (
        <Container>
            <Typography variant="h4" align="center" gutterBottom>
                Product Details
            </Typography>
            <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: 400, margin: '0 auto' }}>
                <CardMedia
                    component="img"
                    height="300"
                    image={detailsProduct.image}
                    alt={detailsProduct.title}
                />
                <CardContent sx={{ textAlign: 'center' }}>
                    <Typography gutterBottom variant="h5" component="div">
                        {detailsProduct.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 2 }}>
                        {detailsProduct.description}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Rating name="read-only" value={detailsProduct.rating ? detailsProduct.rating.rate : 0} readOnly />
                    </Box>
                </CardContent>
            </Card>
        </Container>
    );
}

export default ProductDetails;
