
const uiActions = {
    setInputEmptyWarning(message){
        return (dispatch) => {
            dispatch({ 
                type: "SET_INPUT_EMPTY_WARNING",
                message: message
            });
	   }    
    },
    
    toggleQuaggaModal(message){
        return (dispatch) => {
            dispatch({ 
                type: "TOGGLE_QUAGGA_MODAL",
                message: message
            });
	   }    
    },
    
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
                scrollTo(0, 0);
                dispatch({
                    type: 'STOP',
                });
                dispatch({ 
                    type: "SET_INPUT_EMPTY_WARNING",
                    message: ''
                });
                dispatch({ 
                    type: "CHANGE_PAGE", 
                    currentPage: page     
                });    
            }
	   }        
    },
    
    previousPage(){
		return (dispatch) => {
            scrollTo(0, 0);
            dispatch({
                    type: 'STOP',
            }); 
            dispatch({ 
                type: "GO_BACK"    
            });
	   }       
    }
    
};

export default uiActions;
