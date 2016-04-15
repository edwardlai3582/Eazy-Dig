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
		if (e.ebay && e.ebay.length !== 0) {            
            rows = e.ebay.map((result) =>{
                return (
                    <dl key={result.itemId[0]}>
                        <dt> {result.title[0] } </dt>
                        <dd><strong>ships form:</strong> {' '+ result.location[0] } </dd>
                        <dd><strong>price:</strong> {' '+ result.sellingStatus[0].convertedCurrentPrice[0]['__value__']+ ' '+ result.sellingStatus[0].convertedCurrentPrice[0]['@currencyId'] } </dd>
                        <dd><strong>condition:</strong> { result.condition?' '+ result.condition[0].conditionDisplayName[0] : 'N/A'} </dd>
                    </dl>
                );
            }); 
		}
        if(rows.length===0){
            rows='0 result';
        }

		return (
            <section>
                <div className={e.ebaySearching?'MarketplaceAndEbayShow':'MarketplaceAndEbayHide'}>
                    <Glyphicon glyph="refresh" className={e.ebaySearching?'spinning':''} />
                </div>
                <section className={e.ebaySearching?'MarketplaceAndEbayHide':'MarketplaceAndEbayShow'} >
                    { rows }   
                </section>
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
