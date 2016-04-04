import C from '../constants';


const loadingActions = {
    
	startLoading() {
		return (dispatch) => {
            dispatch({ type: "LOADING_START" });
            scrollTo(0, 0);
	   }
    }
};

export default loadingActions;
