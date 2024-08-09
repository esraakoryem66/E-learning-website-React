import { combineReducers } from 'redux';
import wishlistReducer from '../Reducers/wishlistReducer.js';
import favoReducer from '../Reducers/favoReducer.js';

const combinReducer = combineReducers({
  wishlist: wishlistReducer,
  favorites: favoReducer,
});

export default combinReducer;
