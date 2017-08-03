import React from 'react';

import './style.scss';

const BidderAvatar = (props) => {
  const bidder = props.bidder;
  let active = true;
  let eligible = true;

  if (!bidder.activeConnection) {
    active = false;
  }

  if (bidder.cap === 0 || bidder.spots === 0) {
    eligible = false;
  }

  if (!bidder.eligible) {
    eligible = false
  }
  return (
      <div className="bidder-avatar-container">
        <div className={"bidder-avatar col-md-1" + (active ? ' ' : ' inactive') + (props.nominating ? ' nominating' : '') + (eligible ? ' ' : ' ineligible')}>
          <div className="bidder-avatar-text">
            <h3>{bidder.name}</h3>
            <h2>${bidder.cap}</h2>
            <p>Spots {bidder.spots}</p>
          </div>
        </div>
      </div>
  );
}

export default BidderAvatar;
