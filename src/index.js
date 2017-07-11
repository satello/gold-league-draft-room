import React from 'react';
import ReactDOM from 'react-dom';
import { createDevTools } from 'redux-devtools'
import LogMonitor from 'redux-devtools-log-monitor'
import DockMonitor from 'redux-devtools-dock-monitor'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
// middleware
import thunk from 'redux-thunk';
import socketMiddleware from './middleware/socket'
// redux
import {Router, browserHistory} from 'react-router';

// routes
import {Route, IndexRoute, Redirect} from 'react-router';
import App from './App';

// real pages
import Page404 from './views/404';
import auctionRoom from './views/auctionRoom';
import login from './views/login';

// import main style dependency file
import './index.scss';

// Import the reducers
import * as reducers from './reducers';
import * as appActions from './actions/app';
// import { authorizeJwt } from './actions/socket';


const DevTools = createDevTools(
    <DockMonitor
        toggleVisibilityKey="ctrl-h"
        changePositionKey="ctrl-q"
        defaultPosition="right"
        defaultIsVisible={false}
    >
        <LogMonitor theme="tomorrow" preserveScrollTop={false} />
    </DockMonitor>
);

const store = createStore(
    combineReducers({
        ...reducers,
        routing: routerReducer
    }),
    compose(
        applyMiddleware(thunk, socketMiddleware),
        DevTools.instrument()
    )
);

const history = syncHistoryWithStore(browserHistory, store);

class Index {
    constructor() {
        this.isInitialized = false;
        this.isLoggedIn = false;
        this.isOnboarding = false;
        store.subscribe(this.onStoreUpdate.bind(this));
        store.dispatch(appActions.initializeApp());
    }

    onStoreUpdate() {
        const {isInitialized, isLoggedIn, isOnboarding} = store.getState().appState;
        if (this.isInitialized !== isInitialized) {
            this.isInitialized = isInitialized;
            this.startApp();
        }
        if(this.isLoggedIn !== isLoggedIn) {
            this.isLoggedIn = isLoggedIn;
        }
        if(this.isOnboarding !== isOnboarding) {
            this.isOnboarding = isOnboarding;
        }
    }

    requireToken = (nextState, replace) => {
      const token = localStorage.getItem('jwt');
      if (!token) {
        replace({
            pathname: '/login',
            state: { nextPathname: nextState.location.pathname }
        })
      }
    }

    checkForAuthCode = (nextState, replace) => {
      // if user is logged in don't show them login page
      if(this.isLoggedIn) {
        replace({
            pathname: '/'
        })
      }
    }

    startApp() {
      ReactDOM.render(
        <Provider store={store}>
          <div>
            <Router history={history}>
              <Route component={App} path='/'>
                  <IndexRoute component={auctionRoom} onEnter={this.requireToken} />
                  <Route path="login" component={login} />
              </Route>
              {/* default */}
              <Route component={Page404} path="404"/>
              <Redirect from="*" to="404"/>
            </Router>/>
            <DevTools />
          </div>
        </Provider>,
        document.getElementById('root')
      );
    }
}

new Index();
