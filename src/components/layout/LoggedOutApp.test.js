import React from 'react';
import ReactDOM from 'react-dom';
import LoggedOutApp from './LoggedOutApp';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<LoggedOutApp />, div);
});
