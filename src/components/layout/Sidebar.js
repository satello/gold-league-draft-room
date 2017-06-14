import React from 'react';
import { connect } from 'react-redux';

import { Link, IndexLink } from 'react-router';

import * as appActions from '../../reducers/app/actions';

import '../../styles/Sidebar.css';

const Sidebar = (props) => {
    const visible = props.sidebarNavOpen ? '' : 'hidden-xs';
    const toggleNav = props.sidebarNavOpen ? props.toggleNav : null;
    return (
        <div className={`col-md-2 col-sm-3 sidebar ${visible}`}>
            <ul className="sidebar-navigation">
                <li><IndexLink to="/" onClick={toggleNav} activeClassName="active">Commodities</IndexLink></li>
                <li><Link to="/calendar" onClick={toggleNav} activeClassName="active">Calendar</Link></li>
                <li><Link to="/availability" onClick={toggleNav} activeClassName="active">Availability</Link></li>
                <li><Link to="/billing" onClick={toggleNav} activeClassName="active">Billing</Link></li>
                <li><Link to="/settings" onClick={toggleNav} activeClassName="active">Settings</Link></li>
                <li className="visible-xs"><Link to="/logout" onClick={props.logout}>Log Out</Link></li>
            </ul>
            { props.sidebarNavOpen && props.isLoading && (
                <div className="loader">
                    <i className="fa fa-spinner fa-pulse fa-3x fa-fw" />
                </div>
            )}

        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        isLoading: state.appState.isLoading,
        sidebarNavOpen: state.appState.sidebarNavOpen
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        toggleNav: () => {
            dispatch(appActions.toggleNav());
        },
        logout: () => {
            dispatch(appActions.logoutUser());
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps())(Sidebar);
