import C from '../constants';


const uiActions = {
    
	toggleDiscogsMarketplace() {
		return (dispatch) => {
            dispatch({ type: "TOGGLE_SHOW_DISCOGS_MARKETPLACE" });
	   }
    },
    
	toggleEbay() {
		return (dispatch) => {
            dispatch({ type: "TOGGLE_SHOW_EBAY" });
	   }
    }
};

export default uiActions;
