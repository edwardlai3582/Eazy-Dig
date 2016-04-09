import { combineReducers } from 'redux';

import searchReducer from './search_reducer';
import queryReducer from './query_reducer';
import loadingReducer from './loading_reducer';
import releaseReducer from './release_reducer';
import suggestPriceReducer from './suggestPrice_reducer';
import discogsMarketplaceReducer from './discogsMarketplace_reducer';
import ebayReducer from './ebay_reducer';
import whosampledReducer from './whosampled_reducer';
import uiReducer from './ui_reducer';
import favoriteReducer from './favorite_reducer';
import spotifyReducer from './spotify_reducer';

import { routeReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
	routing: routeReducer,
    form: formReducer,
    
    search: searchReducer,
    query: queryReducer,
    loading: loadingReducer,
    release: releaseReducer,
    suggestPrice: suggestPriceReducer,
    discogsMarketplace: discogsMarketplaceReducer,
    ebay: ebayReducer,
    whosampled: whosampledReducer,
    ui: uiReducer,
    favorite: favoriteReducer,
    spotify: spotifyReducer
});

export default rootReducer;
