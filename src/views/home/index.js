import React, {Component} from 'react';
import { connect } from 'react-redux';

import { openAuctionRoom } from '../../actions/app';
import { getDraftRooms } from '../../actions/drafts';

import './style.scss';

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;


class Home extends Component {
  componentDidMount() {
    this.props.getDraftRooms();
  }

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
      if (!this.props.draftsState) return false;
      const draftRoomDivs = [];
      const draftRooms = this.props.draftsState.drafts;

      let room;
      for (var i=0; i<draftRooms.length; i++) {
        room = draftRooms[i];
        draftRoomDivs.push(
          <div key={draftRooms[i].roomId} className="row display-drafts">
            <div className="col-md-1">
              <div className={"draft-active" + (room.isRunning ? " connected" : "")} />
            </div>
            <div className="col-md-5">
              <a href={"/" + room.roomId}>{room.roomId}</a>
            </div>
            <div className="col-md-3">
              <p>Active Connections: {room.activeConnections}</p>
            </div>
            <div className="col-md-3">
              <a href={`http://draftserver.goldleagueff.com/${room.roomId}.csv`}>Download Results</a>
            </div>
          </div>
        );
      }

      return (
        <div className="home">
          <div className="continue-btn">
            <div className="new-draft-room-btn btn" onClick={this.newDraftRoom.bind(this)}>Create Auction Room</div>
          </div>
          <div className="content">
            <h3> Open Draft Rooms </h3>
            <div className="row">
              <div className="col-md-9 draft-room-containers">
                {draftRoomDivs}
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
    },
    getDraftRooms: () => {
      dispatch(getDraftRooms());
    },
  }
};

const mapStateToProps = (state) => {
    return state;
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
