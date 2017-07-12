import React from 'react';

import './style.scss';

const BidderAvatar = (props) => {
  const bidder = props.bidder;
  return (
    <div className="bidder-avatar">
      <h3>{bidder.name}</h3>
      <p>Cap {bidder.cap}</p>
      <p>Spots {bidder.spots}</p>
    </div>
  );
}

export default BidderAvatar;
