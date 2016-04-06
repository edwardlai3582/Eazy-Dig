import C from '../../constants';
import initialState from '../initialstate';


export default (currentstate, action) => {    
	switch (action.type) {
		case "TOGGLE_SHOW_DISCOGS_MARKETPLACE":
			return Object.assign({}, currentstate, {
				showDiscogsMarketplace: !currentstate.showDiscogsMarketplace
			});
            
		case "TOGGLE_SHOW_EBAY":
			return Object.assign({}, currentstate, {
				showEbay: !currentstate.showEbay
			});  
            
		default: return currentstate || initialState.ui;
	}
};
