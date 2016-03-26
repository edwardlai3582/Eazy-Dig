import C from '../../constants';
import initialState from '../initialstate';

const translate = (s) => {
        if(s.indexOf("exist") > -1){
            return "wrong email"    
        }
        else if (s.indexOf("password") > -1){
            return "wrong password"    
        }
        else if (s.indexOf("in use") > -1){
            return "this email address is already in used"    
        }
        else{
            return s;
        }
}

export default (currentfeedback, action) => {    
	switch (action.type) {
		case C.DISMISS_FEEDBACK:
			return { msg: "", error: false };
		case C.DISPLAY_ERROR:
            return { msg: translate(action.error), error: true };
		case C.DISPLAY_MESSAGE:
            return { msg: translate(action.message), error: false };
		default: return currentfeedback || initialState.feedback;
	}
};
