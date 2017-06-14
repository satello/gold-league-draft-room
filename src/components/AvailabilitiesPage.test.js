import React from 'react';
import ReactDOM from 'react-dom';
import AvailabilitiesPage from './AvailabilitiesPage';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<AvailabilitiesPage />, div);
});
