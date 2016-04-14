import C from '../../constants';
import initialState from '../initialstate';


export default (currentstate, action) => {    
	switch (action.type) {
        case "DISCOGS_MARKETPLACE_START_SEARCH":
			return {  
                discogsMarketplace: action.discogsMarketplace, 
                discogsMarketplaceSearching: true    
            };
            
		case "DISCOGS_MARKETPLACE_RECEIVED":
			return {  
                discogsMarketplace: action.discogsMarketplace, 
                discogsMarketplaceSearching: false 
            };   
		default: return currentstate || initialState.discogsMarketplace;
	}
};
