import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../actions';

import Event from './event';
import { Button, Modal, Accordion } from 'react-bootstrap';
import { routeActions } from 'react-router-redux';

class Events extends Component {
    componentWillMount() {
		this.props.startListeningToEvents();
	}
    
    open() {
        setTimeout(window.scrollTo(0,0),100);
        this.props.goSomewhere('newevent');
    }

	render() {
		const p = this.props;
		let rows = [];
		if (p.events.data) {
			rows = Object.keys(p.events.data).map((qid) => {
				const event = p.events.data[qid];
				return (
					<Event
						key={qid}
						event={event}
						qid={qid}
						delete={p.deleteEvent.bind(this, qid)}
					/>
				);
			});
		}
		return (
			<div className="eventslist">
                <Accordion>
                    {p.events.hasreceiveddata ? rows.length===0? 'You have no event!' : rows : 'Loading events...'}
                </Accordion>
                <div className="neweventWrapper">
                    <Button className="neweventB" onClick={this.open.bind(this)} >
                        Add New Event
                    </Button>
                </div>    
			</div>
		);
	}
} 

const mapStateToProps = (appState) => {
	return {
		events: appState.events,
		auth: appState.auth
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		deleteEvent(qid) { dispatch(actions.deleteEvent(qid)); },
        startListeningToEvents(){dispatch(actions.startListeningToEvents()); },
        goSomewhere(url) { dispatch(routeActions.push(url)); },
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Events);
