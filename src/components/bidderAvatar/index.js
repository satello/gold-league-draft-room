import React from 'react';

import './style.scss';

const BidderAvatar = (props) => {
  const bidder = props.bidder;
  let active = true;

  if (bidder.cap === 0 || bidder.spots === 0 || !bidder.activeConnection) {
    active = false;
  }
  return (
      <div className={"bidder-avatar col-md-1 " + (active ? ' ' : 'inactive ') + (props.nominating ? 'nominating' : '')}>
        <div className="bidder-avatar-text">
          <h3>{bidder.name}</h3>
          <h2>${bidder.cap}</h2>
          <p>Spots {bidder.spots}</p>
        </div>
      </div>
  );
}

export default BidderAvatar;
