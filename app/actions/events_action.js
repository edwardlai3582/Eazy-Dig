import C from '../constants';
import Firebase from 'firebase';

const Ref = new Firebase(C.FIREBASE);

const eventsActions = {
	startListeningToEvents() {
		return (dispatch, getState) => {
            const state = getState();
			const uid = state.auth.uid;
            var eventsRef = Ref.child('users').child(uid).child('events');
			eventsRef.on('value', (snapshot) => {
				dispatch({ type: C.RECEIVE_EVENTS_DATA, data: snapshot.val() });
			});
		};
	},
    
	deleteEvent(qid) {
		return (dispatch, getState) => {
			const state = getState();
			dispatch({ type: C.SUBMIT_EVENT_EDIT, qid });
            const uid = state.auth.uid;
			Ref.child('users').child(uid).child('events').child(qid).remove((error) => {
				dispatch({ type: C.FINISH_EVENT_EDIT, qid });
				if (error) {
					dispatch({ type: C.DISPLAY_ERROR, error: 'Deletion failed! ' + error });
				} else {
					dispatch({ type: C.DISPLAY_MESSAGE, message: 'Event successfully deleted!' });
				}
			});
		};
	},
    
	submitNewEvent(data) {
		return (dispatch, getState) => {
			const state = getState();
			const uid = state.auth.uid;
            var eventsRef = Ref.child('users').child(uid).child('events');
            
            dispatch({ type: C.AWAIT_NEW_EVENT_RESPONSE });
            eventsRef.push({ 
                            "name": data.eventName,
                            "type": data.eventType,
                            "host": data.eventHost,
                            "start": data.eventStartDatetime,
                            "end": data.eventEndDatetime,
                            "guest": data.eventGuestlist,
                            "location": data.eventLocation,
                            "message": data.eventOptionalmessage?data.eventOptionalmessage:""
                           }, (error2) => {
                dispatch({ type: C.RECEIVE_NEW_EVENT_RESPONSE });
                if (error2) {
                    dispatch({ type: C.DISPLAY_ERROR, error: 'Submission failed! ' + error });
                } else {
                    //dispatch({ type: C.DISPLAY_MESSAGE, message: 'Submission successfully saved!' });
                    dispatch({ type: 'HIDEEVENTMODAL'});
                }
            });
		};
	}
};

export default eventsActions;
