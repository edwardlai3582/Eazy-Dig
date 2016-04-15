import C from '../constants';


const favoriteActions = {
    getFavFromIdb(favs){
        return (dispatch, getState) => {
            dispatch({
                type: "FAV_FROM_IDB_ADDED",
                favs: favs
            }); 
        };          
    },
    
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
