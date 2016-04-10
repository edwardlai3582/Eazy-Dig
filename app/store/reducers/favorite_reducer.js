import C from '../../constants';
import initialState from '../initialstate';


export default (currentstate, action) => {    
	switch (action.type) {
		case "TOGGLE_FAVORITE":
            console.log(action.chosen_title);
            for(let i=0; i<currentstate.favorite.length; i++){                
                if(action.id === currentstate.favorite[i].id){
                    currentstate.favorite.splice(i, 1); 
                    return Object.assign({}, currentstate ); 
                }
            }
            
            currentstate.favorite.push({id: action.id, chosen_title: action.chosen_title});
            return Object.assign({}, currentstate ); 
            
		default: return currentstate || initialState.favorite;
	}
};
