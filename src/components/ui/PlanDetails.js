import React from 'react';

import '../../styles/ui/PlanDetails.css';

const PlanDetails = (props) =>
  <div className="PlanDetails">
    <h2>${props.planCost}<span>/month</span></h2>
    <p>All subscriptions include a 2.5% transaction fee</p>
    <h5>Your subscription includes:</h5>
    <ul>
      <li>Unlimited Consultations</li>
      <li>Sync with your Google Calendar</li>
      <li>Accept Payments through PayPal</li>
      <li>Email Reminders</li>
    </ul>
  </div>;

PlanDetails.PropTypes = {
  planCost: React.PropTypes.number
};

export default PlanDetails;
