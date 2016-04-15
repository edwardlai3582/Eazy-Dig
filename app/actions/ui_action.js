import C from '../constants';


const uiActions = {
    
    toggleReleaseModal(message){
        return (dispatch) => {
            dispatch({ 
                type: "TOGGLE_RELEASE_MODAL",
                message: message
            });
	   }    
    },
    
	toggleDiscogsMarketplace() {
		return (dispatch) => {
            dispatch({ type: "TOGGLE_SHOW_DISCOGS_MARKETPLACE" });
	   }
    },
    
	toggleEbay() {
		return (dispatch) => {
            dispatch({ type: "TOGGLE_SHOW_EBAY" });
	   }
    },
    
	toggleWhosampled(position) {
		return (dispatch) => {
            dispatch({ 
                type: "TOGGLE_SHOW_WHOSAMPLED", 
                position: position     
            });
	   }
    },
    
    changePage(page){
		return (dispatch, getState) => {
            if(page===getState().ui.currentPage){
                return;    
            }
            else{
                dispatch({ 
                    type: "CHANGE_PAGE", 
                    currentPage: page     
                });    
            }
	   }        
    },
    
    previousPage(){
		return (dispatch) => {
            dispatch({ 
                type: "GO_BACK"    
            });
	   }       
    }
    
};

export default uiActions;
