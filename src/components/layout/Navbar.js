import React from 'react';
import { connect } from 'react-redux';
import { Link,} from 'react-router';

import '../../styles/Navbar.css';
import logo from '../../images/logo.png';

import * as appActions from '../../reducers/app/actions';

const Navbar = (props) => {
    const loggedInUser = props.appState.loggedInUser;
    return (
        <nav className="navbar">
            <div className="logo">
                <img src={logo} alt="Consultation Kit Logo" />
            </div>
            <ul className="right-navigation hidden-xs">
                <li className="logout">
                    <Link to="/logout" onClick={() => props.dispatch(appActions.logoutUser())}>
                        Log out <span>{loggedInUser.first_name} {loggedInUser.last_name}</span>
                    </Link>
                </li>
            </ul>
            <button className="visible-xs nav-toggle" onClick={() => props.dispatch(appActions.toggleNav())}>
              <i className="fa fa-bars" aria-hidden="true" />
            </button>
        </nav>
    );
};

const mapStateToProps = (state) => {
    return {
        appState: state.appState
    };
};

export default connect(mapStateToProps)(Navbar);