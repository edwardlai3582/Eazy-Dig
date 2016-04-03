import React, { Component } from 'react';

import { connect } from 'react-redux';
import C from '../constants';
import { routeActions } from 'react-router-redux';

const mapStateToProps = (appState) => {
	return { auth: appState.auth };
};

const mapDispatchToProps = (dispatch) => {
	return {
        goSomewhere(url) { dispatch(routeActions.push(url)); },
	};
};


class Fav extends Component {
    
	render() {
		return (
			<div>
				FAV
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Fav);
