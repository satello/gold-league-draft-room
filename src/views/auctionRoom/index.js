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
import NominationBox from '../../containers/nominationBox';
import Ticker from '../../components/ticker';
import PlayerAvatar from '../../components/playerAvatar';
// import AuctionBox from '../../containers/AuctionBox';

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
        <div className="AuctionRoom">
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
        <div className="AuctionRoom">
          <Login roomId={this.props.params.roomId}/>
        </div>
      )
    } else {
      // MAIN APP
      return (
        <div className="AuctionRoom">
          <div className="continue-btn">
            <div className="new-draft-room-btn btn" onClick={this.startDraft.bind(this)}>Next Nomination</div>
          </div>
          <div className="row">
            <div className="col-md-7">
              <div className="bid-contianer">
                <BiddersBox />
                <Ticker />
              </div>
              <div className="chat-container">
                <div className="row">
                  <div className="col-md-8">
                    <ChatBox />
                  </div>
                  <div className="col-md-4">
                    <NominationBox />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-5">
              <div className="item-contianer">
                <PlayerBox />
              </div>
            </div>
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
