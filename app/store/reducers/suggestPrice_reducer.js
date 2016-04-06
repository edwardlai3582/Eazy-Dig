import C from '../../constants';
import initialState from '../initialstate';


export default (currentstate, action) => {    
	switch (action.type) {
		case "PRICE_RECEIVED":
			return {  suggestPrice: action.suggestPrice };   
		default: return currentstate || initialState.suggestPrice;
	}
};
