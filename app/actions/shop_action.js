
const shopActions = {
    
	getShop() {
		return (dispatch, getState) => {
            
            dispatch({
                type: "SHOP_START_SEARCH",
                ebay: []
            });
            
            navigator.geolocation.getCurrentPosition((pos)=>{
                let lat = pos.coords.latitude;
                let lng = pos.coords.longitude;
                
                //'https://edwardlai3582.com/' &callback=JSON_CALLBACK'
                fetch('https://whosampled-illl48.c9users.io/yelp?lat='+lat+'&lng='+lng).then((response)=>{
                if(response.ok) {
                    response.json().then((myJson)=> {
                        
                        console.log(myJson);                  
                        
                        dispatch({
				            type: "SHOP_RECEIVED",
				            shop: myJson.businesses
				        });
                        
                        
                    });
                } else {
                    console.log('Network response was not ok.');
                    dispatch({
                        type: "SHOP_RECEIVED",
                        shop: []
				    });
                }

            })
            .catch((error)=> {
                console.log('There has been a problem with your fetch operation: ' + error.message);
                dispatch({
                        type: "SHOP_RECEIVED",
                        shop: []
				});
            });
            }, (err)=>{
                console.log('ERROR(' + err.code + '): ' + err.message);    
            });
        };
	}
};

export default shopActions;
