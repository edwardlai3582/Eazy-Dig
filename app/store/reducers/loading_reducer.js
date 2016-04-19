import initialState from '../initialstate';


export default (currentstate, action) => {    
	switch (action.type) {
		case "LOADING_START":
            console.log("LOADING_START");
			return { loadingNow: true };  
        case "LOADING_END":
			return { loadingNow: false };      
		default: return currentstate || initialState.loading;
	}
};
