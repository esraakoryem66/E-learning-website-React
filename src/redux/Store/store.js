import { createStore } from 'redux';
import rootReducer from '../Reducers/rootReducer.js';

const store = createStore(rootReducer);

export default store;
