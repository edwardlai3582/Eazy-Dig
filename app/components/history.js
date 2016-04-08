import React, { Component } from 'react';
import { connect } from 'react-redux';
import C from '../constants';
import { routeActions } from 'react-router-redux';
import { Image } from 'react-bootstrap';
import actions from '../actions';

class History extends Component {
    submitQuery(history) {
        this.props.goSomewhere('/releases');
        this.props.startLoading();
        let data = {};
        data.recordQuery= history;
        this.props.submitNewRecord(data);
        //this.props.resetForm();
    }
    
	render() {
        
        const h = this.props.query.queryHistory;
		let rows = [];
        
		         
            rows = h.map((history) =>{
                return (
                    <li onClick={this.submitQuery.bind(this, history)}>
                    {history}        
                    </li>
                );
            }); 
		
        
        
        
		return (
            <section>
                <h5> recent searches </h5>
                
                <ul >
                    { rows }
                </ul> 
            </section> 
		);
	}
}


const mapStateToProps = (appState) => {
	return {  query: appState.query };
};

const mapDispatchToProps = (dispatch) => {
	return {
        submitNewRecord(data) { dispatch(actions.submitNewRecord(data)); },
        goSomewhere(url) { dispatch(routeActions.push(url)); },
        startLoading(){ dispatch(actions.startLoading()); }
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(History);
