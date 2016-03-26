import C from '../../constants';
import initialState from '../initialstate';

export default (currentstate, action) => {
	let newstate;
	switch (action.type) {
		case C.RECEIVE_EVENTS_DATA:
			return Object.assign({}, currentstate, {
				hasreceiveddata: true,
				data: action.data
			});
		case C.AWAIT_NEW_EVENT_RESPONSE:
			return Object.assign({}, currentstate, {
				submittingnew: true
			});
		case C.RECEIVE_NEW_EVENT_RESPONSE:
			return Object.assign({}, currentstate, {
				submittingnew: false
			});
            
		default: return currentstate || initialState.events;
	}
};
