// src/api.js
import axios from 'axios';

export const fetchProducts = () => {
  return axios.get('https://fakestoreapi.com/products')
    .then(response => response.data)
    .catch(error => {
      throw new Error('Error fetching products');
    });
};
