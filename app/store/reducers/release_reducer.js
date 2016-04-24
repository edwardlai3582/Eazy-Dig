import initialState from '../initialstate';


export default (currentstate, action) => {    
	switch (action.type) {
		case "RELEASE_TITLE_CHOSEN":
            return Object.assign({}, currentstate, {
				chosen_title: action.chosen_title, 
                id: action.id
			});
            
        case "RELEASE_RECEIVED":
            console.log(action.release);
            return Object.assign({}, currentstate, {
				release: action.release
			});
            
		default: return currentstate || initialState.release;
	}
};
