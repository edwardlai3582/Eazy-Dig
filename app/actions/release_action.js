
const releaseActions = {
    
    chooseRelease(title, id){
        return (dispatch) => {
            dispatch({
                type: "RELEASE_TITLE_CHOSEN",
                chosen_title: title,
                id: id
            });     
        };       
    },
    
	getRelease(data) {
		return (dispatch, getState) => {
            console.log(data);
            
            fetch('https://edwardlai3582.com/discogsrelease?id='+data).then(function(response){
                if(response.ok) {
                    response.json().then(function(myJson) {
                        
                        //console.log(myJson);                  
                        //console.log('==========');
                        
                        let showWhosampled= {};
                        for(let i=0; i<myJson.tracklist.length; i++){
                            showWhosampled[myJson.tracklist[i].position]=false;    
                        }
                        dispatch({
				            type: "RESET_SHOW_WHOSAMPLED",
				            showWhosampled: showWhosampled
				        });
                        
                        dispatch({
				            type: "RELEASE_RECEIVED",
				            release: myJson
				        });
                        dispatch({ type: "LOADING_END" });
                    });
                    //'https://www.discogs.com/sell/history/1985784'
                    //'https://edwardlai3582.com/discogsprice?id='+data
                    fetch('https://edwardlai3582.com/discogsprice?id='+data).then(function(response){
                        if(response.ok) {
                            response.json().then(function(myJson) {
                                console.log(myJson);
                                dispatch({
                                    type: "PRICE_RECEIVED",
                                    suggestPrice: myJson
                                });
                            });    
                        }
                        else {
                            console.log('PRICE: Network response was not ok.');
                        }
                    });   
                } else {
                    console.log('Network response was not ok.');
                    dispatch({ type: "LOADING_END" });
                }

            })
            .catch(function(error) {
                console.log('There has been a problem with your fetch operation: ' + error.message);
                dispatch({ type: "LOADING_END" });
            });
        };
    }
};

export default releaseActions;
