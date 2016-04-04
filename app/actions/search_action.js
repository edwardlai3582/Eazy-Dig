import C from '../constants';


const searchActions = {
    
	submitNewRecord(data) {
		return (dispatch, getState) => {
            console.log(data);
            
            fetch('https://edwardlai3582.com/discogs?query='+data.recordQuery+'&page=1').then(function(response){
                if(response.ok) {
                    response.json().then(function(myJson) {
                        console.log(myJson);                  
                        //dispatch({ type: 'FINISHED_SEARCH'});
                        dispatch({
				            type: "SEARCH_RESULTS_RECEIVED",
				            page: myJson.pagination.page,
                            pages: myJson.pagination.pages,
                            results: myJson.results,
				        });
                    });
                } else {
                    console.log('Network response was not ok.');
                    //dispatch({ type: 'FINISHED_SEARCH'});
                }

            })
            .catch(function(error) {
                console.log('There has been a problem with your fetch operation: ' + error.message);
                //dispatch({ type: 'FINISHED_SEARCH'});
            });
        };
	}
};

export default searchActions;
