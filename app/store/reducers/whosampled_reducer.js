import C from '../../constants';
import initialState from '../initialstate';


export default (currentstate, action) => {    
	switch (action.type) {
		case "WHOSAMPLED_RECEIVED":
            console.log(action.trackSample);
            if(currentstate.currentRelease!==action.currentRelease){
                console.log(currentstate.currentRelease);
                console.log(action.currentRelease);
                let temp={};
                temp[action.position]=action.trackSample;
                
                return {  currentRelease: action.currentRelease,  whosampled: temp };     
            }
            else{
                currentstate.whosampled[action.position]=action.trackSample;
                
                return Object.assign({}, currentstate );                
            }
			 
		default: return currentstate || initialState.whosampled;
	}
};
