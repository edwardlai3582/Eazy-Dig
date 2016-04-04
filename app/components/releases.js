import React, { Component } from 'react';

import { connect } from 'react-redux';
import C from '../constants';
import { routeActions } from 'react-router-redux';
import { Link } from 'react-router';
import { Glyphicon } from 'react-bootstrap';

import Release from './release';

class Releases extends Component {
    
	render() {
		const p = this.props;
		let rows = [];
		if (p.search.results) {            
            rows = p.search.results.map((result) =>{
                return (
                    <Release 
                        thumb={result.thumb}
                        title={result.title}
                        format={result.format}
                        catno={result.catno}
                        year={result.year}
                        label={result.label}
                        country={result.country}
                        genre={result.genre[0]}
                    />
                );
            }); 
		}
        
		return (
            <div>
                <header className="releasesHeader">
                    <Link to="/" className="link"><Glyphicon glyph="circle-arrow-left" /></Link> 
                    <h4>search results</h4>
                </header>
                <section className="releasesWrapper">
                    {rows.length===0? 'found nothing' : rows}  
                </section>
            </div>
		);
	}
}

const mapStateToProps = (appState) => {
	return { search: appState.search };
};

const mapDispatchToProps = (dispatch) => {
	return {
        goSomewhere(url) { dispatch(routeActions.push(url)); },
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Releases);
