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
            
		case "RESET_SHOW_WHOSAMPLED":
			return Object.assign({}, currentstate, {
				showWhosampled: action.showWhosampled
			}); 

		case "TOGGLE_SHOW_WHOSAMPLED":
            currentstate.showWhosampled[action.position]= !currentstate.showWhosampled[action.position];
			return Object.assign({}, currentstate );             
            
		default: return currentstate || initialState.ui;
	}
};
