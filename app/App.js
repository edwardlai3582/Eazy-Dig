import React, { Component } from 'react';
import { Router, Route, IndexRoute, browserHistory, Redirect} from 'react-router';
import { Provider } from 'react-redux';
import store from './store';
import actions from './actions';
import Toplevel from './components/toplevel';

export class App extends Component {    
	render() {
		return (
            <Provider store={store}>
                <Toplevel />
            </Provider>
		);
	}
}


//BASENAME example
/*
import { Router, Route, useRouterHistory } from 'react-router'
import { createHistory } from 'history'
import { syncHistory } from 'redux-simple-router'

import Layout from 'views/Layout'
import User from 'views/User'
import About from 'views/About'

const basename = '/test'

const history = useRouterHistory(createHistory)({
  basename
})

export const routerMiddleware = syncHistory(history)
export const routes = (
  <Router history={history}>
    <Route path='/' component={Layout}>
      <Route path='/user' component={User}/>
      <Route path='/about' component={About}/>
    </Route>
  </Router>
)
*/