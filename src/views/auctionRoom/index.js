import React, { Component } from 'react';

import './style.scss';

import ChatBox from '../../containers/chatBox';


class AuctionRoom extends Component {
  render() {
    return (
      <div className="AuctionRoon">
        <div className="bid-contianer"></div>
        <div className="item-contianer"></div>
        <div className="chat-container">
          <ChatBox />
        </div>
      </div>
    );
  }
}

export default AuctionRoom;
