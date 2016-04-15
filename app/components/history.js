import React, { Component } from 'react';
import { connect } from 'react-redux';
import C from '../constants';
import { Image } from 'react-bootstrap';
import actions from '../actions';



class History extends Component {
    
    submitQuery(history) {
        this.props.startLoading();
        let data = {};
        data.recordQuery= history;
        this.props.submitNewRecord(data);
        this.props.changePage('releases');
    }
    
	render() {
        const h = this.props.query.queryHistory;
		let rows = [];	         
        console.log(rows);
        rows = h.map((history) =>{
                return (
                    <li onClick={this.submitQuery.bind(this, history.query)} key={history.timestamp}>
                    {history.query}        
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
        startLoading(){ dispatch(actions.startLoading()); },
        changePage(page) { dispatch(actions.changePage(page)); },
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(History);
