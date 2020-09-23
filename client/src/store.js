import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import itemReducer from './reducers';

const initialState = {};

const middleware = [thunk];

const store = createStore(itemReducer, initialState, compose(applyMiddleware(...middleware), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()) );

export default store;