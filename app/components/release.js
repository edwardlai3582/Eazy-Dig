import React, { Component } from 'react';

import { connect } from 'react-redux';
import C from '../constants';
import { routeActions } from 'react-router-redux';
import { Link } from 'react-router';
import { Button, Glyphicon } from 'react-bootstrap';
import actions from '../actions';

class Release extends Component {
    /*
    submitQuery(page) {
        let data = {};
        data.page =  this.props.search.page + page;
        data.recordQuery = this.props.query.queryHistory[this.props.query.queryHistory.length-1];
        this.props.startLoading();
        this.props.submitNewRecord(data);
    }
    */
    renderRelease(){
        const r = this.props.release.release;
        if(!r){
            return '';    
        }
        
        let format_descriptions = '';
        for(let i=0; i<r.formats[0].descriptions.length; i++){
            format_descriptions = format_descriptions.concat(', ').concat(r.formats[0].descriptions[i]);
        }
        
        let trackLi = [];
        trackLi = r.tracklist.map((track) =>{
                return (
                    <li className="track">
                    {track.position+' '+track.title}
                    </li>
                );
            });
        
        return (
            <div className="releaseWrapper">
                <section className="releaseInfoWrapper">
                    <img src={r.thumb} alt={r.title} />
                    <ul>
                        <li> {'Label: ' +r.labels[0].name+' - '+r.labels[0].catno } </li>
                        <li> {'Format: ' +r.formats[0].name+ format_descriptions } </li>
                        <li> {'Country: ' +r.country } </li>
                        <li> {'Released: ' +r.released_formatted} </li>
                        <li> {'Genre: ' +r.genres[0]} </li>
                        <li> {'Rating: ' +r.community.rating.average+' /5'} </li>
                    </ul>
                    <Glyphicon glyph="heart" />
                </section>
                <section className="releaseTracklistWrapper">
                    <h5> Tracklist </h5>
                    <ul>
                        {trackLi}
                    </ul>
                </section>
            </div>
        );
    }
    
    render() {
        const r = this.props.release;
        const h4style={color:'#FDD24F'};
		return (
            <div>
                <header className="releasesHeader">
                    <Link to="/releases" className="link"><Glyphicon glyph="circle-arrow-left" /></Link> 
                    <h4 style={h4style}>{r.chosen_title}</h4>
                </header>
                
                {this.renderRelease()}
            </div>
		);
	}
}

const mapStateToProps = (appState) => {
	return { 
        release: appState.release,
    };
};

const mapDispatchToProps = (dispatch) => {
	return {
        goSomewhere(url) { dispatch(routeActions.push(url)); },
        submitNewRecord(data) { dispatch(actions.submitNewRecord(data)); },
        startLoading(){ dispatch(actions.startLoading()); }
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Release);
