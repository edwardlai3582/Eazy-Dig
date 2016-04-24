
const discogsMarketplaceActions = {
    
	searchDiscogsMarketPlace() {
		return (dispatch, getState) => {
            dispatch({
                type: "DISCOGS_MARKETPLACE_START_SEARCH",
                discogsMarketplace: []
            });            
            //getState().auth.currently 
            fetch('https://api.discogs.com/marketplace/search?release_id='+getState().release.id).then((response) => {
                if(response.ok) {
                    response.json().then((myJson) => {
                        console.log(myJson);                  
                        
                        dispatch({
				            type: "DISCOGS_MARKETPLACE_RECEIVED",
				            discogsMarketplace: myJson
				        });
                        //dispatch({ type: "LOADING_END" });
                    });
                } else {
                    console.log('Network response was not ok.');
                    //dispatch({ type: "LOADING_END" });
                    dispatch({
				        type: "DISCOGS_MARKETPLACE_RECEIVED",
				        discogsMarketplace: []
				    });
                }

            })
            .catch((error) => {
                console.log('There has been a problem with your fetch operation: ' + error.message);
                //dispatch({ type: "LOADING_END" });
                dispatch({
                    type: "DISCOGS_MARKETPLACE_RECEIVED",
                    discogsMarketplace: []
                });
            });
        };
	}
};

export default discogsMarketplaceActions;
