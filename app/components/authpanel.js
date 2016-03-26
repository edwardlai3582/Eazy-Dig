import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../actions';
import C from '../constants';

import { Button } from 'react-bootstrap';
import { routeActions } from 'react-router-redux';

class Authpanel extends Component {
    onClick() {
        this.props.logoutUser();
        this.props.goSomewhere('/');
    }
    
    render() {
		const p = this.props;
		switch (p.auth.currently) {
			case C.LOGGED_IN: return (
				<div className="authpanel">
                    <div className="appName"> MeetUp Planner </div>
					<Button className="logoutB" onClick={this.onClick.bind(this)}>Log out</Button>
				</div>
			);
			default: return (
				<div></div>
			);
		}
	}
}

const mapStateToProps = (appState) => {
	return { auth: appState.auth };
};

const mapDispatchToProps = (dispatch) => {
	return {
		logoutUser() { dispatch(actions.logoutUser()); },
        goSomewhere(url) { dispatch(routeActions.push(url)); },
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Authpanel);
