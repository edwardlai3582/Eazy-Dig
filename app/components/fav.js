import React, { Component } from 'react';

import { connect } from 'react-redux';
import C from '../constants';
import { routeActions } from 'react-router-redux';
import actions from '../actions';

import { Button, Panel, Glyphicon } from 'react-bootstrap';

class Fav extends Component {
    
    toggleFavorite(id, chosen_title){
        this.props.toggleFavorite(id, chosen_title);    
    }
    
	render() {
        
        const f = this.props.favorite.favorite;
		let rows = [];
        
		          
            rows = f.map((favorite) =>{
                return (
                    <li>
                        <Button onClick={ this.toggleFavorite.bind(this, favorite.id, favorite.chosen_title) }>
                          <Glyphicon glyph="remove-circle" />
                       </Button>
                        <article>
                            <p>{favorite.chosen_title}</p>
                        </article>
                    </li>
                );
            }); 
		
        
        if(rows.length===0){
            rows='no favorite added';
        }
        
		return (
            <article>
                <ul>
                    { rows }
                </ul> 
            </article>
		);
	}
}


const mapStateToProps = (appState) => {
	return { favorite: appState.favorite };
};

const mapDispatchToProps = (dispatch) => {
	return {
        goSomewhere(url) { dispatch(routeActions.push(url)); },
        toggleFavorite(id, chosen_title){ dispatch(actions.toggleFavorite(id, chosen_title)); }
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Fav);
