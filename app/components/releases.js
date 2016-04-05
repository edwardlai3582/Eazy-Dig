import React, { Component } from 'react';

import { connect } from 'react-redux';
import C from '../constants';
import { routeActions } from 'react-router-redux';
import { Link } from 'react-router';
import { Button, Glyphicon } from 'react-bootstrap';
import actions from '../actions';
import Displayrelease from './displayrelease';

class Releases extends Component {
    
    submitQuery(page) {
        let data = {};
        data.page =  this.props.search.page + page;
        data.recordQuery = this.props.query.queryHistory[this.props.query.queryHistory.length-1];
        this.props.startLoading();
        this.props.submitNewRecord(data);
    }

    render() {
		const p = this.props;
		let rows = [];
		if (p.search.results) {            
            rows = p.search.results.map((result) =>{
                return (
                    <Displayrelease 
                        thumb={result.thumb}
                        title={result.title}
                        format={result.format}
                        catno={result.catno}
                        year={result.year}
                        label={result.label}
                        country={result.country}
                        genre={result.genre[0]}
                        id={result.id}
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
                <footer className="releasesFooter">
                    <Button onClick={this.submitQuery.bind(this, -1)} disabled={p.search.page===1}>
                        <Glyphicon glyph="triangle-left" /> 
                    </Button>
                    {p.search.page} / {p.search.pages}
                    <Button onClick={this.submitQuery.bind(this, 1)} disabled={p.search.page===p.search.pages}>
                        <Glyphicon glyph="triangle-right" />
                    </Button>        
                </footer>
            </div>
		);
	}
}

const mapStateToProps = (appState) => {
	return { 
        search: appState.search,
        query: appState.query
    };
};

const mapDispatchToProps = (dispatch) => {
	return {
        goSomewhere(url) { dispatch(routeActions.push(url)); },
        submitNewRecord(data) { dispatch(actions.submitNewRecord(data)); },
        startLoading(){ dispatch(actions.startLoading()); }
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Releases);
