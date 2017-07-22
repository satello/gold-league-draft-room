import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

// css
import './style.scss';

// components
import Login from '../../components/login';
import ChatBox from '../../containers/chatBox';
import BiddersBox from '../../containers/biddersBox';
import PlayerBox from '../../containers/playerBox';
import Ticker from '../../components/ticker';

// actions
import { connectSocket } from '../../actions/socket';
import { startDraft } from '../../actions/app';


class AuctionRoom extends Component {
  componentWillMount() {
    const roomId = this.props.params.roomId;

    if (!roomId) {
      // go home if no draft room. (is this possible?)
      browserHistory.push('/');
    }

    // connect to room
    this.props.connectSocket(roomId);
  }

  startDraft() {
    this.props.startDraft();
  }

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
          <Login roomId={this.props.params.roomId}/>
        </div>
      )
    } else {
      // MAIN APP
      return (
        <div className="AuctionRoon">
          <div className="continue-btn">
            <div className="new-draft-room-btn btn" onClick={this.startDraft.bind(this)}>Start Draft</div>
          </div>
          <div className="bid-contianer">
            <BiddersBox />
            <Ticker />
          </div>
          <div className="item-contianer">
            <PlayerBox />
          </div>
          <div className="chat-container">
            <ChatBox />
          </div>
        </div>
      );
    }
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    connectSocket: (roomId) => {
      dispatch(connectSocket(roomId));
    },
    startDraft: () => {
      dispatch(startDraft())
    }
  }
};

const mapStateToProps = (state) => {
    return state;
};

export default connect(mapStateToProps, mapDispatchToProps)(AuctionRoom);
