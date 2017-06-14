import React from 'react';

import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Notification from '../ui/Notification';

const LoggedInApp = (props) => {
    return (
        <div className="dashboard logged-in">
            <Navbar />
            <div className="container-fluid">
                <div className="row content-area">
                    <Sidebar />
                    <div className="col-md-10 col-md-push-2 col-sm-9 col-sm-push-3 no-padding">
                        {props.children}
                    </div>
                </div>
            </div>
            <Notification />
        </div>
    );
};

LoggedInApp.propTypes = {
    children: React.PropTypes.element
};

export default LoggedInApp;
