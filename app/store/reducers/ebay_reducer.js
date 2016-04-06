import C from '../../constants';
import initialState from '../initialstate';


export default (currentstate, action) => {    
	switch (action.type) {
		case "EBAY_RECEIVED":
            console.log(action.ebay);
			return {  ebay: action.ebay };   
		default: return currentstate || initialState.ebay;
	}
};
