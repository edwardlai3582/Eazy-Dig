import { applyMiddleware, createStore } from 'redux';
import rootReducer from './reducers';
import initialState from './initialstate';
import thunk from 'redux-thunk';

import { syncHistory } from 'react-router-redux';
import { browserHistory } from 'react-router';
const reduxRouterMiddleware = syncHistory(browserHistory);

const createStoreWithMiddleware = applyMiddleware(reduxRouterMiddleware, thunk)(createStore);
export default createStoreWithMiddleware(rootReducer, initialState);
