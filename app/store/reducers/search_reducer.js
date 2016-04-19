import initialState from '../initialstate';


export default (currentstate, action) => {    
	switch (action.type) {
		case "SEARCH_RESULTS_RECEIVED":
			return { page: action.page, pages: action.pages, results:action.results };   
		default: return currentstate || initialState.search;
	}
};
