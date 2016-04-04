import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { routeActions } from 'react-router-redux'
    
import { Glyphicon } from 'react-bootstrap'

class Toplevel extends Component {
    
	render() {
		return (
            <div>
                <header id="navbar">
                    <h2>Eazy-Dig</h2>
                    <nav>
                        <Link to="/fav" className="link" activeClassName="active"><Glyphicon glyph="heart" /></Link>
                        <Link to="/" className="link" ><Glyphicon glyph="search" /></Link>      
                    </nav>
                </header>
                <section className="childrenWrapper">
                    <div className={this.props.loading.loadingNow? 'showLoading': 'hideLoading'} >
                        <Glyphicon glyph="refresh" className="spinning" />    
                    </div>
                    {this.props.children}
                </section>
            </div>
		);
	}
}

/*

*/
const mapStateToProps = (appState) => {
	return { 
        loading: appState.loading,
        query: appState.query
    };
};

export default connect(mapStateToProps, routeActions)(Toplevel);
