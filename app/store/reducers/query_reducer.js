import C from '../../constants';
import initialState from '../initialstate';


export default (currentstate, action) => {    
	switch (action.type) {
		case "QUERY_ADDED":
            let newArr = currentstate.queryHistory.slice(0);
            if(newArr.length===currentstate.historyLength){
                newArr.shift();    
            }
            newArr.push(action.query);    
                        
			return { queryHistory: newArr };    
		default: return currentstate || initialState.query;
	}
};
