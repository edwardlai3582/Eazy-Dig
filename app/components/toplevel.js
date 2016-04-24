import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import actions from '../actions';    
import { Button, Glyphicon } from 'react-bootstrap'

import Search from './search';
import Releases from './releases';
import Release  from './release';
import Fav from './fav';

import idb from '../idb';

class Toplevel extends Component {
	componentDidMount() {
        let getHistoryFromIdb = this.props.getHistoryFromIdb;
        let getFavFromIdb = this.props.getFavFromIdb;
        
        console.log('DID MOUNT');
        
        idb.open('eazyDig', 3, (upgradeDb)=> {
            switch (upgradeDb.oldVersion) {
                case 0:
                    upgradeDb.createObjectStore('urls', {
                        keyPath: 'url'
                    });
                    
                case 1:
                    var store=upgradeDb.createObjectStore('history', { 
                                keyPath: "timestamp"
                            });
                    store.createIndex('by-time', 'timestamp');
                    
                case 2:
                    var store=upgradeDb.createObjectStore('fav', { 
                                keyPath: "id"
                            });
                    store.createIndex('by-name', 'chosen_title');    
            }
        }).then((db)=>{
            var index1 = db.transaction('history').objectStore('history');
            index1.getAll().then((queries)=> {
                getHistoryFromIdb(queries);
            });
            
            var index2 = db.transaction('fav').objectStore('fav');
            index2.getAll().then((favs)=> {
                getFavFromIdb(favs);
            });            
        });    
	}
    
	render() {        
		return (
            <div>
                <header id="navbar">
                    <h2 onClick={ this.props.changePage.bind(this, 'search') }>Eazy-Dig</h2>
                    <nav>
                        <Glyphicon glyph="heart" className={this.props.ui.currentPage==="fav"? 'navGlySelected': 'navGly'} onClick={ this.props.changePage.bind(this, 'fav') } />
                        <Glyphicon glyph="search" className={this.props.ui.currentPage==="search"? 'navGlySelected': 'navGly'} onClick={ this.props.changePage.bind(this, 'search') } />       
                    </nav>
                </header>
                <section className="childrenWrapper">
                    <div className={this.props.loading.loadingNow? 'showLoading': 'hideLoading'} >
                        <Glyphicon glyph="refresh" className="spinning" />    
                    </div>
                    {(() => {
                        switch (this.props.ui.currentPage) {
                            case "releases": return <Releases />;
                            case "release":  return <Release />;
                            case "fav":      return <Fav />;
                            default:         return <Search />;
                        }
                    })()}
                </section>
            </div>
		);
	}
}

const mapStateToProps = (appState) => {
	return { 
        loading: appState.loading,
        query: appState.query,
        ui: appState.ui
    };
};

const mapDispatchToProps = (dispatch) => {
	return {
        changePage(page) { dispatch(actions.changePage(page)); },
        getHistoryFromIdb(queries) { dispatch(actions.getHistoryFromIdb(queries)); },
        getFavFromIdb(favs) { dispatch(actions.getFavFromIdb(favs)); }
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Toplevel);