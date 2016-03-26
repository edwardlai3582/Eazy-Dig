const modalActions = {
	showSignupModal() {
		return { type: 'SHOWSIGNUPMODAL' };
	},
    
    hideSignupModal() {
		return { type: 'HIDESIGNUPMODAL' };
	},
};

export default modalActions;