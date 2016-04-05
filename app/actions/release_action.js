import C from '../constants';


const releaseActions = {
    
    chooseReleaseTitle(data){
        return (dispatch) => {
            dispatch({
                type: "RELEASE_TITLE_CHOSEN",
                chosen_title: data
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
                        
                        dispatch({
				            type: "RELEASE_RECEIVED",
				            release: myJson
				        });
                        dispatch({ type: "LOADING_END" });
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
