import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { routeActions } from 'react-router-redux'

import { Navbar, Nav, NavItem, Glyphicon } from 'react-bootstrap';

function Toplevel({ push, children }) {
  return (
    <div>
        <header id="navbar">
            <h2>Eazy-Dig</h2>
            <nav>
                <Link to="/fav" className="link"><Glyphicon glyph="heart" /></Link>
                <Link to="/" className="link"><Glyphicon glyph="search" /></Link>      
            </nav>
        </header>
        <section className="childrenWrapper">
            {children}
        </section>
    </div>
  )
}

export default connect(
  null,
  routeActions
)(Toplevel)

    /*
    <Link to="/" className="link"><Glyphicon glyph="search" /></Link>
    <Link to="/fav" className="link"><Glyphicon glyph="heart" /></Link>
    */