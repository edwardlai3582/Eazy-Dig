import C from '../../constants';
import initialState from '../initialstate';


export default (currentstate, action) => {    
	switch (action.type) {
		case "QUERY_ADDED":
            if(action.query === currentstate.queryHistory[currentstate.queryHistory.length-1]){
                return currentstate;
            }
            else{
                currentstate.queryHistory.slice(0);
                if(currentstate.queryHistory.length===currentstate.historyLength){
                    currentstate.queryHistory.shift();    
                }
                currentstate.queryHistory.push(action.query);    

                return Object.assign({}, currentstate );                 
            }
   
		default: return currentstate || initialState.query;
	}
};
