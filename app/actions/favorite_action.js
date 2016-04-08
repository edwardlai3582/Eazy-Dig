import C from '../constants';


const favoriteActions = {
    
	toggleFavorite(id, chosen_title) {
		return (dispatch) => {
            dispatch({
                type: "TOGGLE_FAVORITE",
                id: id,
                chosen_title: chosen_title
            });     
        };
    }
    
};

export default favoriteActions;
