import initialState from '../initialstate';


export default (currentstate, action) => {    
	switch (action.type) {
        case "SHOP_START_SEARCH":
            return Object.assign({}, currentstate, {
				//shop: action.shop, 
                shopSearching: true  
			});   
            
		case "SHOP_RECEIVED":
            return Object.assign({}, currentstate, {
				shop: action.shop, 
                shopSearching: false 
			});
            
		default: return currentstate || initialState.shop;
	}
};

