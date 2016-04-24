import React, { Component } from 'react';

import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Modal, Button, Panel, Glyphicon, OverlayTrigger, Tooltip } from 'react-bootstrap';
import actions from '../actions';

import DiscogsMarketplace from './discogsMarketplace';
import Ebay from './ebay';
import Spotify from './spotify';
import Whosampled from './whosampled';

class Release extends Component {
    
    closeModal(){
        this.props.toggleReleaseModal('');
    }
    
    audioended(){
        console.log('audioended');
        this.props.spotifyEnded();    
    }
    
    searchDiscogsMarketplace(){
        if(!this.props.ui.showDiscogsMarketplace){
            this.props.searchDiscogsMarketPlace();    
        }
        this.props.toggleDiscogsMarketplace(); 
    }
    
    searchEbay(){
        if(!this.props.ui.showEbay){
            this.props.searchEbay();    
        }
        this.props.toggleEbay(); 
    }    
    
    searchWhosampled(title, artist, position){
        if(!this.props.ui.showWhosampled[position]){
            this.props.searchSample(title, artist, position); 
        }
        else {
            this.props.toggleWhosampled(position);
        }
    }
    
    toggleFavorite(){
        this.props.toggleFavorite(this.props.release.id, this.props.release.chosen_title);        
    }
    
    renderRelease(){
        const r = this.props.release.release;
        const p = this.props.suggestPrice.suggestPrice;
        
        let inFav = false;
        for(let i=0; i<this.props.favorite.favorite.length; i++){
            if(this.props.favorite.favorite[i].id === this.props.release.id){
                inFav = true;
            }
        }
        
        if(!r){
            return '';    
        }
        
        let format_descriptions = '';
        if(r.formats){
            for(let i=0; i<r.formats[0].descriptions.length; i++){
                format_descriptions = format_descriptions.concat(', ').concat(r.formats[0].descriptions[i]);
            }    
        }
        
        
        let trackLi = [];
        if(r.tracklist){
            trackLi = r.tracklist.map((track) =>{
                return (
                    <li className="track" key={track.title}>
                        <section className="trackSection">
                            <section>
                                <strong>{track.position}</strong>
                                <Spotify position={track.position} artist={r.artists[0].name} title={track.title} />  
                                {track.title}             
                            </section>

                            <Button onClick={ this.searchWhosampled.bind(this, track.title, r.artists[0].name, track.position) }>
                              {this.props.ui.showWhosampled[track.position]?'hide WhoSampled': 'show WhoSampled'}
                            </Button>
                        </section>
                        <Whosampled position={track.position} />
                    </li>
                );
            });            
        }

        return (
            <section className="releaseWrapper">
                <section className="releaseInfoWrapper">
                    <img src={r.thumb} alt={r.title} />
                    <ul>
                        <li> {'Label: ' +r.labels[0].name+' - '+r.labels[0].catno } </li>
                        <li> {'Format: ' +r.formats[0].name+ format_descriptions } </li>
                        <li> {'Country: ' +r.country } </li>
                        <li> {'Released: ' +r.released_formatted} </li>
                        <li> {'Genre: ' +r.genres[0]} </li>
                        <li> {'Rating: ' +r.community.rating.average+' / 5'} </li>
                    </ul>
                </section>
            
               
                
                    <Glyphicon glyph="heart" className={inFav?'removeFav':'addFav'} aria-label="toggle favorite" onClick={this.toggleFavorite.bind(this)}  />
                        
                
                                
            
                <section className="releasePriceWrapper">
                    <h5> PRICE SUGGESTIONS </h5>
                    <ul>
                        {p.hasOwnProperty("Mint (M)")?
    <li className="track"> {'Mint (M): '+Math.floor(p['Mint (M)'].value)+' '+p['Mint (M)'].currency} </li>
                        :''}
                        {p.hasOwnProperty('Near Mint (NM or M-)')?
    <li className="track"> {'Near Mint (NM or M-): '+Math.floor(p['Near Mint (NM or M-)'].value)+' '+p['Near Mint (NM or M-)'].currency} </li>
                        :''}
                        {p.hasOwnProperty('Very Good Plus (VG+)')?
    <li className="track"> {'Very Good Plus (VG+): '+Math.floor(p['Very Good Plus (VG+)'].value)+' '+p['Very Good Plus (VG+)'].currency} </li>
                        :''}
                        {p.hasOwnProperty('Very Good (VG)')?
    <li className="track"> {'Very Good (VG): '+Math.floor(p['Very Good (VG)'].value)+' '+p['Very Good (VG)'].currency} </li>
                        :''}
                        {p.hasOwnProperty('Good Plus (G+)')?
    <li className="track"> {'Good Plus (G+): '+Math.floor(p['Good Plus (G+)'].value)+' '+p['Good Plus (G+)'].currency} </li>
                        :''}
                        {p.hasOwnProperty('Good (G)')?
    <li className="track"> {'Good (G): '+Math.floor(p['Good (G)'].value)+' '+p['Good (G)'].currency} </li>
                        :''}
                        {p.hasOwnProperty('Fair (F)')?
    <li className="track"> {'Fair (F): '+Math.floor(p['Fair (F)'].value)+' '+p['Fair (F)'].currency} </li>
                        :''}
                        {p.hasOwnProperty('Poor (P)')?
    <li className="track"> {'Poor (P): '+Math.floor(p['Poor (P)'].value)+' '+p['Poor (P)'].currency} </li>
                        :''}
                    </ul>
                </section>
                
                <section className="releaseMarketAndEbayWrapper">
                    <h5> Discogs Marketplace 
                        <button onClick={ this.searchDiscogsMarketplace.bind(this) }>
                            <Glyphicon glyph={this.props.ui.showDiscogsMarketplace?"triangle-top":"triangle-bottom"} />
                        </button>
                    </h5>
                    <Panel collapsible className="pricePanel" expanded={this.props.ui.showDiscogsMarketplace}>
                        <DiscogsMarketplace />
                    </Panel>
                </section> 
                    
                <section className="releaseMarketAndEbayWrapper">
                    <h5> eBay 
                        <button onClick={ this.searchEbay.bind(this) }>
                            <Glyphicon glyph={this.props.ui.showEbay?"triangle-top":"triangle-bottom"} />
                        </button>
                    </h5>
                    <Panel collapsible className="pricePanel" expanded={this.props.ui.showEbay}>
                        <Ebay />
                    </Panel>
                </section>
                    
                <audio onEnded={this.audioended.bind(this)} ></audio>    
                
                <section className="releaseTracklistWrapper">
                    <h5> TRACKLIST </h5>
                    <ul>
                        {trackLi}
                    </ul>
                </section>
            </section>
        );
    }
    
    render() {
        const r = this.props.release;
        const h4style={color:'#FDD24F'};
		return (
            <div>
                <header className="releasesHeader">
                    <Glyphicon glyph="circle-arrow-left" onClick={this.props.previousPage.bind(this)} className="link"/>
                    <h4 style={h4style}>{r.chosen_title}</h4>
                </header>
                    
                <header className="dummyHeader">
                    <Glyphicon glyph="circle-arrow-left" className="link"/>
                    <h4>{r.chosen_title}</h4>
                </header>                       

                
                {this.renderRelease()}

                <Modal show={this.props.ui.showReleaseModal} onHide={this.closeModal.bind(this)}>
                    <Modal.Header closeButton>
                    </Modal.Header>        
                    <Modal.Body id="releaseModalBody">
                        { this.props.ui.showReleaseModalMessage }
                    </Modal.Body>
                    <Modal.Footer>
                    <Button onClick={this.closeModal.bind(this)}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
		);
	}
}

const mapStateToProps = (appState) => {
	return { 
        release: appState.release,
        suggestPrice: appState.suggestPrice,
        whosampled: appState.whosampled,
        favorite: appState.favorite,
        ui: appState.ui
    };
};

const mapDispatchToProps = (dispatch) => {
	return {
        submitNewRecord(data) { dispatch(actions.submitNewRecord(data)); },
        startLoading(){ dispatch(actions.startLoading()); },
        toggleDiscogsMarketplace(){ dispatch(actions.toggleDiscogsMarketplace()); },
        searchDiscogsMarketPlace(){ dispatch(actions.searchDiscogsMarketPlace()); },
        toggleEbay(){ dispatch(actions.toggleEbay()); },
        searchEbay(){ dispatch(actions.searchEbay()); },
        toggleWhosampled(position){ dispatch(actions.toggleWhosampled(position)); },
        searchSample(title, artist, position){ dispatch(actions.searchSample(title, artist, position)); },
        toggleFavorite(id, chosen_title){ dispatch(actions.toggleFavorite(id, chosen_title)); },
        spotifyEnded(){ dispatch(actions.spotifyEnded()); },
        previousPage() { dispatch(actions.previousPage()); },
        toggleReleaseModal(message) { dispatch(actions.toggleReleaseModal(message)); }
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Release);
