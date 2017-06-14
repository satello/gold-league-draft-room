import React from 'react';
import { connect } from 'react-redux';

import '../../styles/ui/Notification.css';

import { dismissNotification } from '../../reducers/app/actions';

const Notification = (props) => {
    const notification = props.notification;
    const className = (props.notification.type || '') + (notification.show ? ' slide-in' : ' slide-out');
    return (
        <div className={`Notification ${className}`}>
            <p>{notification.message}</p>
            <a onClick={() => props.dismiss()}>Close</a>
        </div>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        dismiss: () => {
            dispatch(dismissNotification());
        }
    }
};

const mapStateToProps = (state) => {
    return {
        notification: state.appState.notification
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Notification);