import React, { Component } from 'react';
import { Router, Route, IndexRoute, browserHistory, Redirect} from 'react-router';
    
import { Provider } from 'react-redux';

import store from './store';
import actions from './actions';

import Search from './components/search';
import Releases from './components/Releases';
import Release  from './components/Release';
import Fav from './components/fav';
import Toplevel from './components/toplevel';

export class App extends Component {
	componentWillMount() {
		//store.dispatch(actions.startListeningToAuth());
	}
    
	render() {
		return (
            <Provider store={store}>
                <Router history={browserHistory}>
                    <Route path="/" component={Toplevel}>
                        <IndexRoute component={Search}/>
                        <Route path="/releases" component={Releases}/>
                        <Route path="/release"  component={Release}/>
                        <Route path="/fav" component={Fav}/>
                        <Redirect path="*" to="/" />
                    </Route>
                </Router>
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


/*
<Provider store={store}>
    <Router history={browserHistory}>
        <Route path="/" component={Toplevel}>
            <IndexRoute component={Search}/>
            <Route path="/releases" component={Releases}/>
            <Route path="/release"  component={Release}/>
            <Route path="/fav" component={Fav}/>
            <Redirect path="*" to="/" />
        </Route>
    </Router>
</Provider>
*/