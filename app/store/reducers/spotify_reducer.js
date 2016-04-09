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
			return Object.assign({}, {
                currentPosition: action.currentPosition,
                link: '',
				buttonSign: 'refresh'
			}); 
            
        case "CHANGE_SONG_FINISH":
			return Object.assign({}, {
                currentPosition: action.currentPosition,
                link: action.link,
				buttonSign: 'stop'
			});     
            
		default: return currentstate || initialState.spotify;
	}
};
