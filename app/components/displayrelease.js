import React, { Component } from 'react';
import { connect } from 'react-redux';
import C from '../constants';
import { routeActions } from 'react-router-redux';
import { Image } from 'react-bootstrap';
import actions from '../actions';

class Displayrelease extends Component {
    
    getRelease(id, title){
        this.props.goSomewhere('/release');
        this.props.chooseRelease(title, id);
        this.props.startLoading();
        this.props.getRelease(id);
    }
    
	render() {
		const p = this.props;
        let formats = '';
        let labels = '';
        for (let i = 0; i < p.format.length; i++) {
          formats = formats.concat(p.format[i]);
          if(i !== p.format.length-1){
            formats = formats.concat(' / ');    
          }    
        }
        for (let i = 0; i < p.label.length; i++) {
          labels = labels.concat(p.label[i]);
          if(i !== p.label.length-1){
            labels = labels.concat(' / ');    
          }    
        }
        
		return (
            <article className="displayReleaseWrapper" onClick={this.getRelease.bind(this, p.id, p.title)}>
                <img src={p.thumb} alt={p.title} />
                <ul>
                    <li className="releaseTitle">{p.title}</li>
                    <li> { formats } </li>
                    <li> { p.catno } </li>
                    <li> { p.country } </li>
                    <li> { p.year } </li>
                    <li> { labels } </li>
                    <li> { p.genre } </li>
                </ul>
            </article>   
		);
	}
}

const mapStateToProps = (appState) => {
	return { 
        
    };
};

const mapDispatchToProps = (dispatch) => {
	return {
        goSomewhere(url) { dispatch(routeActions.push(url)); },
        getRelease(data) { dispatch(actions.getRelease(data)); },
        chooseRelease(title, id) { dispatch(actions.chooseRelease(title, id)); },
        startLoading(){ dispatch(actions.startLoading()); }
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Displayrelease);
