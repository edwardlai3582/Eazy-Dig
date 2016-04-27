
const spotifyActions = {
    spotifyEnded(){
        return (dispatch, getState) => {
            dispatch({
                type: 'STOP',
            });    
        }    
    },
    
    spotifyPlay(){
        return (dispatch, getState) => {
            dispatch({
                type: 'PLAY',
            });    
        }    
    },
    
    spotifyStop(){
        return (dispatch, getState) => {
            dispatch({
                type: 'STOP',
            });    
        }    
    },
    
	searchSpotify(title, artist, position) {
		return (dispatch, getState) => {
            dispatch({
                type: 'CHANGE_SONG_START',
                currentPosition: position,
                currentId: getState().release.id,
            });
            
            fetch('https://api.spotify.com/v1/search?q='+encodeURI(title)+'%20artist:'+encodeURI(artist)+'&type=track&market=US').then((response)=>{
                if(response.ok) {
                    response.json().then((myJson)=> {
                        console.log(myJson);
                        if(myJson.tracks.items.length==0){
                            //alert("not in Spotify");
                            dispatch({
                                type: 'TOGGLE_RELEASE_MODAL',
                                message: "can't find the song in Spotify"
                            });
                            dispatch({
                                type: 'SONG_NOT_FOUND'
                            });                            
                        }
                        else{
                            let audio=document.getElementsByTagName("audio")[0];
                            audio.src = myJson.tracks.items[0].preview_url;
                            audio.play();
                            dispatch({
                                type: 'CHANGE_SONG_FINISH',
                                currentPosition: position,
                                currentId: getState().release.id,
                                link: myJson.tracks.items[0].preview_url
                            });
                        }
                    });
                } else {
                    console.log('Network response was not ok.');
                    //dispatch({ type: "LOADING_END" });
                    dispatch({
                        type: 'TOGGLE_RELEASE_MODAL',
                        message: "Network response was not ok"
                    });
                    dispatch({
                        type: 'SONG_NOT_FOUND'
                    }); 
                }

            })
            .catch((error)=> {
                console.log('There has been a problem with your fetch operation: ' + error.message);
                //dispatch({ type: "LOADING_END" });
                dispatch({
                    type: 'TOGGLE_RELEASE_MODAL',
                    message: "There has been a problem with your fetch operation"
                });
                dispatch({
                    type: 'SONG_NOT_FOUND'
                }); 
            });
        };
	}
};

export default spotifyActions;
