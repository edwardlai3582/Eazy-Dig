import React, { Component } from 'react';
import { connect } from 'react-redux';
import C from '../constants';
import { Image, Glyphicon } from 'react-bootstrap';
import actions from '../actions';

class DiscogsMarketplace extends Component {
    
	render() {
        const d = this.props.discogsMarketplace;
		let rows = [];
		if (d.discogsMarketplace && d.discogsMarketplace.length !== 0) {            
            rows = d.discogsMarketplace.map((result) =>{
                return (
                    <dl key={result.id} >
                        <dd> <strong>ships form:</strong> {' '+ result.ships_from } </dd>
                        <dd> <strong>price:</strong>{' '+ result.price } </dd>
                        <dd> <strong>sleeve_condition:</strong>{' '+ result.sleeve_condition } </dd>
                        <dd> <strong>condition:</strong>{' '+ result.condition } </dd>
                    </dl>
                );
            }); 
		}
        if(rows.length===0){
            rows='0 result';
        }
        
		return (
            <section>
                <div className={d.discogsMarketplaceSearching?'MarketplaceAndEbayShow':'MarketplaceAndEbayHide'}>
                    <Glyphicon glyph="refresh" className={d.discogsMarketplaceSearching?'spinning':''} />
                </div>

                <section className={d.discogsMarketplaceSearching?'MarketplaceAndEbayHide':'MarketplaceAndEbayShow'}>
                    { rows }
                </section>
                
            </section>
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
