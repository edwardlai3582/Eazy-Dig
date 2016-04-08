import C from '../constants';

const ebayActions = {
    
	searchEbay() {
		return (dispatch, getState) => {
            
            //getState().auth.currently 
            fetch('https://edwardlai3582.com/ebay?keywords='+getState().release.chosen_title).then(function(response){
                if(response.ok) {
                    response.json().then(function(myJson) {
                        myJson=JSON.parse(myJson);
                        //console.log(myJson);                  
                        
                        dispatch({
				            type: "EBAY_RECEIVED",
				            ebay: myJson.findItemsByKeywordsResponse[0].searchResult[0].item
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

export default ebayActions;
