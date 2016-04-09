import React, { Component } from 'react';
import { connect } from 'react-redux';
import C from '../constants';
import { routeActions } from 'react-router-redux';
import { Image } from 'react-bootstrap';
import actions from '../actions';

class Ebay extends Component {
    
	render() {
        
        const e = this.props.ebay.ebay;
		let rows = [];
		if (e.length !== 0) {            
            rows = e.map((result) =>{
                return (
                    <li>
                        <div> {result.title[0] } </div>
                        <div> {'ships form: '+ result.location[0] } </div>
                        <div> {'price: '+ result.sellingStatus[0].convertedCurrentPrice[0]['__value__']+ ' '+ result.sellingStatus[0].convertedCurrentPrice[0]['@currencyId'] } </div>
                        <div> {'shipping: '+ result.shippingInfo[0].shippingServiceCost[0]['__value__']+ ' '+result.shippingInfo[0].shippingServiceCost[0]['@currencyId'] } </div>
                        <div> {'condition: '+ result.condition[0].conditionDisplayName[0] } </div>
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
        ebay: appState.ebay    
    };
};

const mapDispatchToProps = (dispatch) => {
	return {
        
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Ebay);
