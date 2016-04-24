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
                
                return Object.assign({}, currentstate, {
				    currentRelease: action.currentRelease,  
                    whosampled: temp
			    });    
            }
            else{
                //currentstate.whosampled[action.position]=action.trackSample;
                let tempObj= {...currentstate.whosampled};
                tempObj[action.position]=action.trackSample;
                
                return Object.assign({}, currentstate, {
                    whosampled: tempObj    
                });                
            }
			 
		default: return currentstate || initialState.whosampled;
	}
};
