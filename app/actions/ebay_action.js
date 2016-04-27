
const ebayActions = {
    
	searchEbay() {
		return (dispatch, getState) => {
            dispatch({
                type: "EBAY_START_SEARCH",
                ebay: []
            });
            //https://edwardlai3582.com/
            fetch('https://whosampled-illl48.c9users.io/ebay?keywords='+getState().release.chosen_title).then((response)=>{
                if(response.ok) {
                    response.json().then((myJson)=> {
                        myJson=JSON.parse(myJson);
                        console.log(myJson);                  
                        
                        dispatch({
				            type: "EBAY_RECEIVED",
				            ebay: myJson.findItemsAdvancedResponse[0].searchResult[0].item
				        });
                        
                        //dispatch({ type: "LOADING_END" });
                    });
                } else {
                    console.log('Network response was not ok.');
                    dispatch({
                        type: "EBAY_RECEIVED",
                        ebay: []
                    });
                }

            })
            .catch((error)=> {
                console.log('There has been a problem with your fetch operation: ' + error.message);
                dispatch({
                        type: "EBAY_RECEIVED",
                        ebay: []
                });
            });
        };
	}
};

export default ebayActions;
