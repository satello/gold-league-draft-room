import React from 'react';
import ReactDOM from 'react-dom';
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
import Home from './views/home';

// import main style dependency file
import './index.scss';

// Import the reducers
import * as reducers from './reducers';
import * as appActions from './actions/app';
// import { authorizeBidder } from './actions/socket';


const store = createStore(
    combineReducers({
        ...reducers,
        routing: routerReducer
    }),
    compose(
        applyMiddleware(thunk, socketMiddleware),
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
      const token = localStorage.getItem('bidderId');
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
                  <IndexRoute component={Home} />
                  <Route path="/:roomId" component={auctionRoom}/>
              </Route>
              {/* default */}
              <Route component={Page404} path="404"/>
              <Redirect from="*" to="404"/>
            </Router>/>
          </div>
        </Provider>,
        document.getElementById('root')
      );
    }
}

new Index();
