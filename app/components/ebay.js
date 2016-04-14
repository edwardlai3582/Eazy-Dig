import React, { Component } from 'react';
import { connect } from 'react-redux';
import C from '../constants';
import { Image, Glyphicon } from 'react-bootstrap';
import actions from '../actions';

class Ebay extends Component {
    
	render() {
        
        const e = this.props.ebay;
        //console.log('e');
        //console.log(e.ebay);
		let rows = [];
		if (e.ebay.length !== 0) {            
            rows = e.ebay.map((result) =>{
                return (
                    <li>
                        <div> {result.title[0] } </div>
                        <div> {'ships form: '+ result.location[0] } </div>
                        <div> {'price: '+ result.sellingStatus[0].convertedCurrentPrice[0]['__value__']+ ' '+ result.sellingStatus[0].convertedCurrentPrice[0]['@currencyId'] } </div>
                        <div> {result.condition? 'condition: '+ result.condition[0].conditionDisplayName[0] : ''} </div>
                        
                    </li>
                );
            }); 
		}
        if(rows.length===0){
            rows='0 result';
        }
/*
<div> {'shipping: '+ result.shippingInfo[0].shippingServiceCost[0]['__value__']+ ' '+result.shippingInfo[0].shippingServiceCost[0]['@currencyId'] } </div>                        
*/
		return (
            <section>
            <div className={e.ebaySearching?'ebayShow':'ebayHide'}>
            <Glyphicon glyph="refresh" className={e.ebaySearching?'spinning':''} />
            </div>
            <ul className={e.ebaySearching?'ebayHide':'ebayShow'}>
                { rows }
            </ul>
            </section>
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
