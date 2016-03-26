import C from '../constants';

const feedbackActions = {
	dismissFeedback() {
		return { type: C.DISMISS_FEEDBACK };
	}
};

export default feedbackActions;
