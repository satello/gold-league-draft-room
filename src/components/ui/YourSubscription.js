import React from 'react';

import '../../styles/ui/YourSubscription.css';

const YourSubscription = (props) => {
    const subscription = props.subscription,
        organization = props.organization,
        charge_date = formatDate(subscription.current_period_end);

        let trial_msg = null;
        let active_msg = null;
        if(subscription.status === 'trialing') {
            const trial_start = formatDate(subscription.trial_start);
            const trial_days_left = calculateTrialRemaining(subscription.trial_end);
            trial_msg = <p>Your trial began on <strong>{trial_start}</strong>. You have <strong>{trial_days_left}</strong> day{trial_days_left !== 1 ? 's': ''} to go.</p>;
        }
        else {
            const created = formatDate(subscription.created);
            active_msg = <p>Your subscription began on <strong>{created}</strong>.</p>;
        }

    return (
        <div className="YourSubscription">
            { trial_msg || active_msg }
            <p>Your <strong>{organization.cc_brand}</strong> card ending in <strong>{organization.cc_last4}</strong> will be charged on:</p>
            <div className="text-center">
                <h2>{ charge_date }</h2>
                <a onClick={props.showUpdateCreditCardForm}>Update credit card on file</a>
            </div>
        </div>
    )
};

function formatDate(datetime) {
    const date = new Date(datetime);
    return (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear().toString().substr(2,2);
}
function calculateTrialRemaining(trial_end) {
    const oneDay = 24*60*60*1000;
    const today = new Date();
    const trial_end_date = new Date(trial_end);
    return Math.round(Math.abs((today.getTime() - trial_end_date.getTime())/(oneDay)));
}

export default YourSubscription;