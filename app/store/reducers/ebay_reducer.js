import initialState from '../initialstate';


export default (currentstate, action) => {    
	switch (action.type) {
        case "EBAY_START_SEARCH":
            //console.log(action.ebay);
            return Object.assign({}, currentstate, {
				ebay: action.ebay, 
                ebaySearching: true  
			});   
            
		case "EBAY_RECEIVED":
            //console.log(action.ebay);
            return Object.assign({}, currentstate, {
				ebay: action.ebay, 
                ebaySearching: false 
			});
            
		default: return currentstate || initialState.ebay;
	}
};

