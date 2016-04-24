
const whosampledActions = {
    
	searchSample(title, artist, position) {
		return (dispatch, getState) => {
            title= encodeURI(title.split(' ').join('-')); 
            artist= encodeURI(artist.split(' ').join('-'));    

            //fetch("https://crossorigin.me/https://www.whosampled.com/"+artist+"/"+title+"/").then(function(response){
            //"https://www.whosampled.com/"+artist+"/"+title+"/"
            //https://floating-beach-59451.herokuapp.com/
            //https://whosampled-illl48.c9users.io/
          fetch("https://whosampled-illl48.c9users.io/whosampled?title="+title+"&artist="+artist).then(function(response){    
                if(response.ok) {
                    response.text().then(function(myText) {
                        myText=myText.replace('\\\"',"\"").replace(/\\/g,'');
                        
                        
                        let whoSampledUrl= 'https://www.whosampled.com';
                        let sampleArray= [];
                        
                        let parser=new DOMParser();
                        let htmlDoc=parser.parseFromString(myText, "text/html");
                        //console.log(htmlDoc);
                        let aArray= htmlDoc.getElementsByTagName('a');
                        
                        for(let i=0; i< aArray.length; i++){
                            if(aArray[i].attributes.href&&aArray[i].attributes.href.value.startsWith('/sample/')){
                                if(aArray[i].childNodes.length===1){
                                    if(aArray[i].childNodes[0].localName==='img'){
                                           
                                        //console.log(aArray[i].childNodes[0].attributes.src.nodeValue);
                                        let temp={};
                                        temp.imgUrl= whoSampledUrl+aArray[i].childNodes[0].attributes.src.nodeValue;
                                        
                                        let title = aArray[i].attributes.title.nodeValue.split("'s ");
                                        temp.sampleArtist=title[0];
                                        temp.sampleTitle=title[1];
                                        temp.position=position;
                                        //console.log(temp); 
                                        sampleArray.push(temp);
                                    }
                                }                                
                            }
                        }
                        
                        //console.log(sampleArray);
                        
                        dispatch({
				            type: "WHOSAMPLED_RECEIVED",
                            currentRelease: getState().release.id,
                            position: position,
				            trackSample: sampleArray
				        });
                        dispatch({ 
                            type: "TOGGLE_SHOW_WHOSAMPLED", 
                            position: position     
                        });
                        
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

export default whosampledActions;
