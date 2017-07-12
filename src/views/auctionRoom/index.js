import React, { Component } from 'react';

import './style.scss';

import ChatBox from '../../containers/chatBox';
import BiddersBox from '../../containers/biddersBox';


class AuctionRoom extends Component {
  render() {
    return (
      <div className="AuctionRoon">
        <div className="bid-contianer">
          <BiddersBox />
        </div>
        <div className="item-contianer"></div>
        <div className="chat-container">
          <ChatBox />
        </div>
      </div>
    );
  }
}

export default AuctionRoom;
