import React from 'react';
import ReactDOM from 'react-dom';
import CommoditiesPage from './CommditiesPage';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<CommoditiesPage />, div);
});
