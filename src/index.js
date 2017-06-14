import { createDevTools } from 'redux-devtools'
import LogMonitor from 'redux-devtools-log-monitor'
import DockMonitor from 'redux-devtools-dock-monitor'

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import thunk from 'redux-thunk';

// Add generic styles that aren't component specific
import './styles/bootstrap-grid.min.css';
import './styles/index.css';

// Add page components
import LoggedInApp from './components/layout/LoggedInApp';
import LoggedOutApp from './components/layout/LoggedOutApp';
import CommoditiesPage from './components/CommoditiesPage';
import CalendarPage from './components/CalendarPage';
import AvailabilitiesPage from './components/AvailabilitiesPage';
import BillingPage from './components/BillingPage';
import SettingsPage from './components/SettingsPage';
import LoginPage from './components/LoginPage';
import Onboarding from './components/onboarding/Onboarding';
import ConsultationInformation from './components/onboarding/ConsultationInformation';
import YourInformation from './components/onboarding/YourInformation';


// Import the reducers
import * as reducers from './reducers';

import * as appActions from './reducers/app/actions';

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
        applyMiddleware(thunk),
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

    requireAuth(nextState, replace) {
        if (!this.isLoggedIn) {
            replace({
                pathname: '/login',
                state: { nextPathname: nextState.location.pathname }
            })
        }
        if (this.isOnboarding) {
            replace({
                pathname: '/onboarding/1'
            })
        }
    }

    startOnboarding(nextState, replace) {
        if (!this.isLoggedIn) {
            replace({
                pathname: '/login',
                state: { nextPathname: nextState.location.pathname }
            })
        }
    }

    checkForAuthCode(nextState, replace) {
        // if user is logged in don't show them login page
        if(this.isLoggedIn) {
            replace({
                pathname: '/'
            })
        }
    }

    checkForPaypalEmail(nextState, replace) {
        if(nextState.location.query.paypalEmail) {
            replace({
                pathname: nextState.location.pathname,
                state: { paypalEmail: nextState.location.query.paypalEmail }
            })
        }
    }

    startApp() {
        ReactDOM.render(
            <Provider store={store}>
                <div>
                    <Router history={history}>
                        <Route path="/" component={LoggedInApp} onEnter={this.requireAuth.bind(this)}>
                            <IndexRoute component={CommoditiesPage}/>
                            <Route path="calendar" component={CalendarPage}/>
                            <Route path="availability" component={AvailabilitiesPage}/>
                            <Route path="billing" component={BillingPage}/>
                            <Route path="settings" component={SettingsPage} onEnter={this.checkForPaypalEmail.bind(this)}/>
                        </Route>
                        <Route path="/" component={LoggedOutApp}>
                            <Route path="login" component={LoginPage} onEnter={this.checkForAuthCode.bind(this)}/>
                            <Route path="logout" component={LoginPage}/>
                        </Route>
                        <Route path="onboarding" component={Onboarding} onEnter={this.startOnboarding.bind(this)}>
                            <IndexRoute component={ConsultationInformation} />
                            <Route path="1" component={ConsultationInformation} />
                            <Route path="2" component={YourInformation} onEnter={this.checkForPaypalEmail.bind(this)}/>
                        </Route>
                    </Router>
                    <DevTools />
                </div>
            </Provider>,
            document.getElementById('root')
        );
    }
}
new Index();
