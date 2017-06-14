import React from 'react';

import '../../styles/ui/CalendarListItem.css';

const CalendarListItem = (props) =>
    <li
        className={props.chosen ? 'CalendarListItem chosen' : 'CalendarListItem'}
        onClick={props.onClick}
    >
        {props.name}
    </li>;

export default CalendarListItem;
