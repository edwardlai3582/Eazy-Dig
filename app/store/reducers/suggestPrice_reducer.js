import initialState from '../initialstate';


export default (currentstate, action) => {    
	switch (action.type) {
		case "PRICE_RECEIVED":
            return Object.assign({}, currentstate, {
				suggestPrice: action.suggestPrice
			});
			 
		default: return currentstate || initialState.suggestPrice;
	}
};
  