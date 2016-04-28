import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../actions';

import { Button, Panel, Glyphicon } from 'react-bootstrap';



class Fav extends Component {

    toggleFavorite(id, chosen_title){
        this.props.toggleFavorite(id, chosen_title);    
    }

    getRelease(id, title){
        this.props.chooseRelease(title, id);
        this.props.startLoading();
        this.props.getRelease(id);
        
        let audio=document.getElementsByTagName("audio")[0];  
        audio.src = 'noise.mp3';
        audio.play();
    }
    
	render() {
        
        const f = this.props.favorite.favorite;
		let rows = [];
        
		          
            rows = f.map((favorite) =>{
                return (
                    <li key={favorite.id} >
                        <p onClick={this.getRelease.bind(this, favorite.id, favorite.chosen_title)}>{favorite.chosen_title}</p>
                        
                        <Button onClick={ this.toggleFavorite.bind(this, favorite.id, favorite.chosen_title) } aria-label="remove this record from favorite">
                          <Glyphicon glyph="remove" />
                       </Button>     
                    </li>
                );
            }); 
		
        
        if(rows.length===0){
            //rows='no favorite added';
            rows=(<li>no favorite added</li>);
        }
        
		return (
            <section>
                <header className="releasesHeader">
                    <h4>FAVORITE LIST</h4>
                </header>
                <ul id="favUl">
                    { rows }
                </ul>
            </section>
		);
	}
}


const mapStateToProps = (appState) => {
	return { favorite: appState.favorite };
};

const mapDispatchToProps = (dispatch) => {
	return {
        toggleFavorite(id, chosen_title){ dispatch(actions.toggleFavorite(id, chosen_title)); },
        getRelease(data) { dispatch(actions.getRelease(data)); },
        chooseRelease(title, id) { dispatch(actions.chooseRelease(title, id)); },
        startLoading(){ dispatch(actions.startLoading()); },
        changePage(page) { dispatch(actions.changePage(page)); },
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Fav);
