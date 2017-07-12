import React, { Component } from 'react';
import { connect } from 'react-redux';

import './style.scss';

import Login from '../../components/login';
import ChatBox from '../../containers/chatBox';
import BiddersBox from '../../containers/biddersBox';


class AuctionRoom extends Component {
  render() {
    // LOADING STATE
    if (!this.props.socketState || !this.props.socketState.connected) {
      // show loading screen
      return (
        <div className="AuctionRoon">
          <div className="loading-screen">
            <div className="loader"></div>
            <p>Conecting to server...</p>
          </div>
        </div>

      );
    }

    // LOG IN TO DRAFT ROOM
    if (!this.props.socketState.loggedIn) {
      return (
        <div className="AuctionRoon">
          <Login />
        </div>
      )
    } else {
      // MAIN APP
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
}

const mapDispatchToProps = (dispatch) => {
  return {}
};

const mapStateToProps = (state) => {
    return state;
};

export default connect(mapStateToProps, mapDispatchToProps)(AuctionRoom);
