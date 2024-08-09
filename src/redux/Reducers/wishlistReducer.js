// src/wishlistReducer.js
const initialState = {
    wishlist: [],
    favorites: [],
    products: [],
    status: 'idle',
    error: null,
  };
  
  const wishlistReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_TO_WISHLIST':
        return { ...state, wishlist: [...state.wishlist, action.payload] };
      case 'REMOVE_FROM_WISHLIST':
        return { ...state, wishlist: state.wishlist.filter(item => item.id !== action.payload.id) };
      case 'ADD_TO_FAVORITES':
        return { ...state, favorites: [...state.favorites, action.payload] };
      case 'REMOVE_FROM_FAVORITES':
        return { ...state, favorites: state.favorites.filter(item => item.id !== action.payload.id) };
      case 'FETCH_PRODUCTS_REQUEST':
        return { ...state, status: 'loading' };
      case 'FETCH_PRODUCTS_SUCCESS':
        return { ...state, status: 'succeeded', products: action.payload };
      case 'FETCH_PRODUCTS_FAILURE':
        return { ...state, status: 'failed', error: action.error };
      default:
        return state;
    }
  };
  
  export default wishlistReducer;
  