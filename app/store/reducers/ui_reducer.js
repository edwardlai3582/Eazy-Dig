import initialState from '../initialstate';


export default (currentstate, action) => {    
	switch (action.type) {
        case "SET_INPUT_EMPTY_WARNING":
			return Object.assign({}, currentstate, {inputEmptyWarning: action.message} );  
            
        case "TOGGLE_QUAGGA_MODAL":
			return Object.assign({}, currentstate,{
                showQuaggaModal : !currentstate.showQuaggaModal,
                showQuaggaModalMessage : action.message
            } );    
            
        case "TOGGLE_RELEASE_MODAL":
			return Object.assign({}, currentstate, {
                showReleaseModal : !currentstate.showReleaseModal,
                showReleaseModalMessage : action.message
            } );
            
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
            let tempObj= {...currentstate.showWhosampled};
            tempObj[action.position]=!currentstate.showWhosampled[action.position];
            
			return Object.assign({}, currentstate, {
                showWhosampled: tempObj
            } );
            
        case "CHANGE_PAGE":
            //console.log('change page to '+action.currentPage);
            return Object.assign({}, currentstate, {
                previousPage : currentstate.currentPage,
                currentPage : action.currentPage,
                showEbay : false,
                showDiscogsMarketplace : false    
            }); 

        case "GO_BACK":
            let temp = currentstate.previousPage; 
            let previousPage = currentstate.currentPage;
            let currentPage = temp;
            
            return Object.assign({}, currentstate, {
                previousPage : previousPage,
                currentPage : currentPage,
                showEbay : false,
                showDiscogsMarketplace : false    
            } );             
            
		default: return currentstate || initialState.ui;
	}
};
