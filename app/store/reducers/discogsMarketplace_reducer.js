import C from '../../constants';
import initialState from '../initialstate';


export default (currentstate, action) => {    
	switch (action.type) {
		case "DISCOGS_MARKETPLACE_RECEIVED":
			return {  discogsMarketplace: action.discogsMarketplace };   
		default: return currentstate || initialState.discogsMarketplace;
	}
};
