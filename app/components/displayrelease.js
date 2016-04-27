import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image } from 'react-bootstrap';
import actions from '../actions';

class Displayrelease extends Component {
    
    getRelease(id, title){
        this.props.chooseRelease(title, id);
        this.props.startLoading();
        this.props.getRelease(id);

        let audio=document.getElementsByTagName("audio")[0];  
         audio.src = 'noise.mp3';
         audio.play();
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
        getRelease(data) { dispatch(actions.getRelease(data)); },
        chooseRelease(title, id) { dispatch(actions.chooseRelease(title, id)); },
        startLoading(){ dispatch(actions.startLoading()); },
        changePage(page) { dispatch(actions.changePage(page)); },
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Displayrelease);
