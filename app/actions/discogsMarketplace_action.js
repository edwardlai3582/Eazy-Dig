import C from '../constants';


const discogsMarketplaceActions = {
    
	searchDiscogsMarketPlace() {
		return (dispatch, getState) => {
            
            //getState().auth.currently 
            fetch('https://api.discogs.com/marketplace/search?release_id='+getState().release.id).then(function(response){
                if(response.ok) {
                    response.json().then(function(myJson) {
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
                }

            })
            .catch(function(error) {
                console.log('There has been a problem with your fetch operation: ' + error.message);
                //dispatch({ type: "LOADING_END" });
            });
        };
	}
};

export default discogsMarketplaceActions;
