import initialState from '../initialstate';

export default (currentstate, action) => {
	switch (action.type) {
		case 'SHOWSIGNUPMODAL':
			return {showSignupform: true};
		case 'HIDESIGNUPMODAL':
			return {showSignupform: false};   
		default: return currentstate || initialState.showModal;
	}
};
