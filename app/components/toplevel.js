import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import actions from '../actions';    
import { Button, Glyphicon } from 'react-bootstrap'

import Search from './search';
import Releases from './releases';
import Release  from './release';
import Fav from './fav';
    
class Toplevel extends Component {
    
	render() {        
		return (
            <div>
                <header id="navbar">
                    <h2>Eazy-Dig</h2>
                    <nav>
                        <Button onClick={ this.props.changePage.bind(this, 'fav') }>
                            <Glyphicon glyph="heart" />
                        </Button>
                        <Button onClick={ this.props.changePage.bind(this, 'search') }>
                            <Glyphicon glyph="search" /> 
                        </Button>        
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
        changePage(page) { dispatch(actions.changePage(page)); }
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Toplevel);