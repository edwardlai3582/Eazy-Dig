import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { routeActions } from 'react-router-redux'

import Authpanel from './authpanel';

function Toplevel({ push, children }) {
  return (
    <div>
      <Authpanel />
      {children}
    </div>
  )
}

export default connect(
  null,
  routeActions
)(Toplevel)
