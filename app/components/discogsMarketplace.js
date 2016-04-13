import React, { Component } from 'react';
import { connect } from 'react-redux';
import C from '../constants';
import { Image } from 'react-bootstrap';
import actions from '../actions';

class DiscogsMarketplace extends Component {
    
	render() {
        const p = this.props.discogsMarketplace.discogsMarketplace;
		let rows = [];
		if (p.length !== 0) {            
            rows = p.map((result) =>{
                return (
                    <li>
                        <div> {'ships form: '+ result.ships_from } </div>
                        <div> {'price: '+ result.price } </div>
                        <div> {'sleeve_condition: '+ result.sleeve_condition } </div>
                        <div> {'condition: '+ result.condition } </div>
                    </li>
                );
            }); 
		}
        
		return (
            <ul>
                { rows }
            </ul>  
		);
	}
}

const mapStateToProps = (appState) => {
	return { 
        discogsMarketplace: appState.discogsMarketplace    
    };
};

const mapDispatchToProps = (dispatch) => {
	return {
        
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(DiscogsMarketplace);
