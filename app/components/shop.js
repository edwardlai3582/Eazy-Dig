import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../actions';
import { Button, Panel, Glyphicon } from 'react-bootstrap';

class Shop extends Component {
    
    componentDidMount(){
        this.props.getShop();    
    }

    getShopWithRadius(){
        this.props.getShop();
    }
    
	render() {    
        const s = this.props.shop;
		let rows = [];
        
		          
            rows = s.shop.map((shop) =>{
                return (
                    <section  className='shopList'>
                        <img src={shop.image_url} alt={shop.name} />
                        <dl key={shop.id}>
                            <dt> {shop.name } </dt>
                            <dd><strong>rating:</strong> {' '+ shop.rating + ' / 5' } </dd>
                            <dd><strong>distance:</strong> {' '+ Math.round(shop.distance*0.000621371192 * 100) / 100 + ' mi' } </dd>
                            <dd><strong>address:</strong> {' '+ shop.location.display_address[0]+', '+shop.location.display_address[shop.location.display_address.length-1] } </dd>
                            <dd><strong>phone:</strong> {' '+ shop.phone } </dd>
                        </dl>
                    </section>  
                );
            }); 
		
        
        if(rows.length===0){
            rows='';
        }
        
		return (
            <section>
                <header className="releasesHeader">
                    <h4>STORES NEARBY</h4>
                    <Glyphicon glyph="refresh" onClick={ this.getShopWithRadius.bind(this) } className="link" />
                </header>
              
                <section id='shopWrapper'>        
                    <section className={s.shopSearching?'shopShowGly':'shopHide'}>
                        <Glyphicon glyph="refresh" className={s.shopSearching?'spinning':''} />
                    </section>              
        
                    <section className={s.shopSearching?'shopHide':'shopListWRapper'}>
                        { rows } 
                    </section>
                                 
                </section>  

            </section>
		);
	}
}


const mapStateToProps = (appState) => {
	return { 
        shop: appState.shop
    };
};

const mapDispatchToProps = (dispatch) => {
	return {
        startLoading(){ dispatch(actions.startLoading()); },
        
        getShop() { dispatch(actions.getShop()); },
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Shop);
