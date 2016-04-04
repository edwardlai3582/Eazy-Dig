import C from '../constants';


const searchActions = {
    
	submitNewRecord(data) {
		return (dispatch, getState) => {
            console.log(data);
            
            let page = 1;
            
            if(data.hasOwnProperty("page")){
                page = data.page;
            }
            else{
                dispatch({
                    type: "QUERY_ADDED",
                    query: data.recordQuery
				});              
            }
            
            fetch('https://edwardlai3582.com/discogs?query='+data.recordQuery+'&page='+page).then(function(response){
                if(response.ok) {
                    response.json().then(function(myJson) {
                        console.log(myJson);                  
                        //dispatch({ type: 'FINISHED_SEARCH'});
                        dispatch({
				            type: "SEARCH_RESULTS_RECEIVED",
				            page: myJson.pagination.page,
                            pages: myJson.pagination.pages,
                            results: myJson.results
				        });
                        scrollTo(0, 0);
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