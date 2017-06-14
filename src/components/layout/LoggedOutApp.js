import React, { Component } from 'react';

class LoggedOutApp extends Component {
    render() {
        return (
            <div className="dashboard logged-out">
                {this.props.children}
            </div>
        );
    }
}

export default LoggedOutApp;
