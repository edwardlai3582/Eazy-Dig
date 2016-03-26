import React, { Component } from 'react';
import Authpanel from './authpanel';
import Events from './events';
import Login from './login';

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


class Wrapper extends Component {
    loginOrNot(){
        const p = this.props;
		if(p.auth.currently!==C.LOGGED_IN){ 
            return(
                <Login />
            );
        }
        else{
            return(
                <div>
					<Events />
				</div>
            );
        }        
    }
    
	render() {
		return (
			<div>
				{this.loginOrNot()}
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Wrapper);
