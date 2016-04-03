import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { routeActions } from 'react-router-redux'



function Toplevel({ push, children }) {
  return (
    <div>
      <h1>Eazy-D</h1>
      <ul role="nav">
          <li><Link to="/">Search</Link></li>
          <li><Link to="/fav">Fav</Link></li>
      </ul>
      {children}
    </div>
  )
}

export default connect(
  null,
  routeActions
)(Toplevel)
