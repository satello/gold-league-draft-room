import React from 'react';

// style
import './style.scss';


function resetUser() {
  localStorage.removeItem('user');
  localStorage.removeItem('jwt');
  location.reload();
}

export default (props) => (
    <header className="site-head d-flex align-items-center justify-content-between">
        <div className="wrap mr-4">
          <a className="menu-item" href="/">Home</a>
          <div className="log-out menu-item" onClick={resetUser}>Log Out</div>
        </div>
    </header>
);
