import React, {Component} from 'react';
import { connect } from 'react-redux';

import { openAuctionRoom } from '../../actions/app';

import './style.scss';


class Home extends Component {

  newDraftRoom() {
    // FIXME use state instead?
    // rules
    this.props.openAuctionRoom();
  }

  render() {
    if (this.props.appState && this.props.appState.hasRoomId) {
      return (
        <div className="home">
          <div className="roomId-box">
            <h3>Woohoo! You have a draft room open</h3>
            <p>This room will remain open for 24 hours</p>
            <h4>Your Room ID</h4>
            <p>{this.props.appState.roomId}</p>
            <a href={`/${this.props.appState.roomId}`}>Click Here to go to Auction Room</a>
          </div>
        </div>
      )
    } else {
      return (
        <div className="home">
          <div className="continue-btn">
            <div className="new-draft-room-btn btn" onClick={this.newDraftRoom.bind(this)}>Create Auction Room</div>
          </div>
          <div className="content">
            <div className="row">
              <div className="col-md-6">
                <h1> Open Auction Rooms (FIXME doesn't work ATM) </h1>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    openAuctionRoom: () => {
      dispatch(openAuctionRoom());
    }
  }
};

const mapStateToProps = (state) => {
    return state;
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
