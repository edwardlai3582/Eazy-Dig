import C from '../../constants';
import initialState from '../initialstate';


export default (currentstate, action) => {    
	switch (action.type) {
		case "PLAY":
            console.log('now playing');
			return Object.assign({}, currentstate, {
				buttonSign: 'stop'
			});
            
        case "STOP":
            console.log('stop');
			return Object.assign({}, currentstate, {
				buttonSign: 'play'
			});
        
        case "CHANGE_SONG_START":
            console.log("CHANGE_SONG_START");
			return Object.assign({}, {
                currentPosition: action.currentPosition,
                currentId: action.currentId,
                link: '',
				buttonSign: 'refresh'
			}); 
       
        case "SONG_NOT_FOUND":
			return Object.assign({}, {
                currentPosition: action.currentPosition,
                currentId: action.currentId,
                link: '',
				buttonSign: 'play'
			});     
            
        case "CHANGE_SONG_FINISH":
            console.log("CHANGE_SONG_FINISH");
			return Object.assign({}, {
                currentPosition: action.currentPosition,
                currentId: action.currentId,
                link: action.link,
				buttonSign: 'stop'
			});     
            
		default: return currentstate || initialState.spotify;
	}
};
