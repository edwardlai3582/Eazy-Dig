
import React, { Component } from 'react';
import { connect } from 'react-redux';
import C from '../constants';
import { Button, Panel, Glyphicon } from 'react-bootstrap';
import actions from '../actions';

import Tappable from 'react-tappable';

class Spotify extends Component {
    
    clickSpotify(){
        let audio=document.getElementsByTagName("audio")[0];   
            
        if(this.props.position !== this.props.spotify.currentPosition || this.props.release.id != this.props.spotify.currentId ){
            audio.pause();
            this.props.searchSpotify(this.props.title, this.props.artist, this.props.position);
        }
        else{
            if(this.props.spotify.buttonSign==='play') {
                audio.src = this.props.spotify.link;
                this.props.spotifyPlay();
                audio.play();
                
            }
            else if(this.props.spotify.buttonSign==='stop') {
                audio.pause();
                this.props.spotifyStop();
            }
        }
    }
    
	render() {
        let s = this.props.spotify;
        
        if(s.currentPosition === this.props.position && s.currentId === this.props.release.id){
            return(
                
                    <button onClick={this.clickSpotify.bind(this)}>
                        <Glyphicon glyph={s.buttonSign} className={s.buttonSign==='refresh'?'spinning':''} />
                    </button>
               
            );
        }
        else{
            return(
                
                    <button onClick={this.clickSpotify.bind(this)} >
                        <Glyphicon glyph="play" />
                    </button>
                
            );    
        }
	}
}
/*
<Tappable onTap={this.clickSpotify.bind(this)}>

<Button onClick={this.clickSpotify.bind(this)} disabled={s.buttonSign==='refresh'} className="clickable">
    <Glyphicon glyph={s.buttonSign} className={s.buttonSign==='refresh'?'spinning':''} />
</Button>    


<Button onClick={this.clickSpotify.bind(this)} className="clickable">
                    <Glyphicon glyph="play" />
                </Button>
*/
const mapStateToProps = (appState) => {
	return { 
        spotify: appState.spotify,
        release: appState.release
    };
};

const mapDispatchToProps = (dispatch) => {
	return {
        searchSpotify(title, artist, position){ dispatch(actions.searchSpotify(title, artist, position)); },
        spotifyPlay(){ dispatch(actions.spotifyPlay()); },
        spotifyStop(){ dispatch(actions.spotifyStop()); }
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Spotify);
