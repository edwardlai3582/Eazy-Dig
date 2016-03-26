import authActions from './auth_action';
import feedbackActions from './feedback_action';
import eventActions from './events_action';
import modalActions from './modal_action';

export default Object.assign({}, authActions, feedbackActions, modalActions, eventActions);
