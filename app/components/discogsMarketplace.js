import React, { Component } from 'react';
import { connect } from 'react-redux';
import C from '../constants';
import { Image, Glyphicon } from 'react-bootstrap';
import actions from '../actions';

class DiscogsMarketplace extends Component {
    
	render() {
        const d = this.props.discogsMarketplace;
		let rows = [];
		if (d.discogsMarketplace.length !== 0) {            
            rows = d.discogsMarketplace.map((result) =>{
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
        if(rows.length===0){
            rows='0 result';
        }
        
		return (
            <section>
            <div className={d.discogsMarketplaceSearching?'discogsMarketplaceShow':'discogsMarketplaceHide'}>
            <Glyphicon glyph="refresh" className={d.discogsMarketplaceSearching?'spinning':''} />
            </div>
            <ul className={d.discogsMarketplaceSearching?'discogsMarketplaceHide':'discogsMarketplaceShow'}>
                { rows }
            </ul>
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
