// src/wishlistActions.js
import { fetchProducts } from '../../Pages/API/api';

export const addToWishlist = product => ({
  type: 'ADD_TO_WISHLIST',
  payload: product,
});

export const removeFromWishlist = product => ({
  type: 'REMOVE_FROM_WISHLIST',
  payload: product,
});

export const addToFavorites = product => ({
  type: 'ADD_TO_FAVORITES',
  payload: product,
});

export const removeFromFavorites = product => ({
  type: 'REMOVE_FROM_FAVORITES',
  payload: product,
});

export const fetchProductsRequest = () => ({
  type: 'FETCH_PRODUCTS_REQUEST',
});

export const fetchProductsSuccess = products => ({
  type: 'FETCH_PRODUCTS_SUCCESS',
  payload: products,
});

export const fetchProductsFailure = error => ({
  type: 'FETCH_PRODUCTS_FAILURE',
  error,
});

export const fetchProductsThunk = () => dispatch => {
  dispatch(fetchProductsRequest());
  fetchProducts()
    .then(products => {
      dispatch(fetchProductsSuccess(products));
    })
    .catch(error => {
      dispatch(fetchProductsFailure(error.toString()));
    });
};
