import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavorites, removeFromFavorites } from '../../redux/Actions/actionFavo.js';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const FavoritesIcon = ({ product }) => {
    const dispatch = useDispatch();
    const favorites = useSelector(state => state.favorites.favorites);

    if (!product) {
        console.error("Product is undefined");
        return null; // يمكنك عرض رسالة تنبيه بدلاً من إرجاع `null`
    }

    const isFavorite = favorites.some(favproduct => favproduct.id === product.id);

    const handleFavoriteClick = () => {
        if (isFavorite) {
            dispatch(removeFromFavorites(product.id));
        } else {
            dispatch(addToFavorites(product));
        }
    };

    return (
        <span onClick={handleFavoriteClick} style={{ cursor: 'pointer', fontSize: '24px' }}>
            {isFavorite ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
        </span>
    );
};

export default FavoritesIcon;
