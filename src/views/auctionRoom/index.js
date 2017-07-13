import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

// css
import './style.scss';

// components
import Login from '../../components/login';
import ChatBox from '../../containers/chatBox';
import BiddersBox from '../../containers/biddersBox';

// actions
import { connectSocket } from '../../actions/socket';


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
  return {
    connectSocket: (roomId) => {
      dispatch(connectSocket(roomId));
    }
  }
};

const mapStateToProps = (state) => {
    return state;
};

export default connect(mapStateToProps, mapDispatchToProps)(AuctionRoom);
