import searchActions from './search_action';
import loadingActions from './loading_action';
import releaseActions from './release_action';
import uiActions from './ui_action';
import discogsMarketplaceActions from './discogsMarketplace_action';
import ebayActions from './ebay_action';
import whosampledActions from './whosampled_action';
import favoriteActions from './favorite_action';
import spotifyActions from './spotify_action';
import shopActions from './shop_action';

export default Object.assign({}, searchActions, loadingActions, releaseActions, discogsMarketplaceActions, ebayActions, whosampledActions, uiActions, favoriteActions, spotifyActions, shopActions);
