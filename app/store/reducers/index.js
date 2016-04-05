import { combineReducers } from 'redux';

import searchReducer from './search_reducer';
import queryReducer from './query_reducer';
import loadingReducer from './loading_reducer';
import releaseReducer from './release_reducer';

import { routeReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
	routing: routeReducer,
    form: formReducer,
    search: searchReducer,
    query: queryReducer,
    loading: loadingReducer,
    release: releaseReducer
});

export default rootReducer;
