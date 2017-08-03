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
import ItemBox from '../../containers/itemBox';
import NominationBox from '../../containers/nominationBox';

// actions
import { connectSocket } from '../../actions/socket';
import { startDraft, pauseDraft, resumeDraft } from '../../actions/app';
import { rollbackNomination, leaveDraft } from '../../actions/drafts';

const JINGLE = new Audio(require('./nominationjingle.wav'));


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

  pauseDraft() {
    this.props.pauseDraft();
  }

  resumeDraft() {
    this.props.resumeDraft();
  }

  rollbackNomination() {
    this.props.rollbackNomination();
  }

  leaveDraft() {
    this.props.leaveDraft();
    this.hideLeaveDraftConfirm();
  }

  showLeaveDraftConfirm() {
    const leaveBtn = document.getElementById("leave-draft-btn");
    leaveBtn.style.display = 'none';
    const confirmDiv = document.getElementById("confirm-leave-draft");
    confirmDiv.style.display = 'inline-block';
  }

  hideLeaveDraftConfirm() {
    const confirmDiv = document.getElementById("confirm-leave-draft");
    confirmDiv.style.display = 'none';
    const leaveBtn = document.getElementById("leave-draft-btn");
    leaveBtn.style.display = 'inline-block';
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.bidderState && nextProps.bidderState && this.props.bidderState.currentNominatorId !== nextProps.bidderState.currentNominatorId) {
      const isCurrentNominator = nextProps.bidderState.currentNominatorId === localStorage.getItem("bidderId");
      if (isCurrentNominator) {
        JINGLE.play();
      }
    }
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
      let startPauseBtn;
      if (!this.props.appState.isRunning) {
        // if draft isn't running yet show start draft button
        startPauseBtn = (<div className="new-draft-room-btn btn" onClick={this.startDraft.bind(this)}>Start Draft</div>);
      } else if (!this.props.appState.paused) {
        // show pause button
        startPauseBtn = (<div className="new-draft-room-btn btn" onClick={this.pauseDraft.bind(this)}>Pause Draft</div>);
      } else {
        // show resume button
        startPauseBtn = (<div className="new-draft-room-btn btn" onClick={this.resumeDraft.bind(this)}>Resume Draft</div>);
      }

      let undoBtn;
      const user = JSON.parse(localStorage.getItem('user'));
      if (user.name === "Zach" || user.name === "Sam") {
        undoBtn = (<div className="btn" onClick={this.rollbackNomination.bind(this)}>Undo Pick</div>);
      }

      return (
        <div className="AuctionRoom main-view">
          <div className="continue-btn">
            {startPauseBtn}
          </div>
          <div className="rollback-btn">
            {undoBtn}
          </div>
          <div className="leave-draft">
            <div id="leave-draft-btn" onClick={this.showLeaveDraftConfirm}>
              Finish Draft
            </div>
            <div id="confirm-leave-draft">
              <p>Are you sure? You cannot rejoin once you leave</p>
              <p className="option" onClick={this.leaveDraft.bind(this)}>yes</p>
              <span>/</span>
              <p className="option" onClick={this.hideLeaveDraftConfirm}>no</p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-7">
              <div className="bid-container">
                <BiddersBox />
                <ItemBox />
              </div>
              <div className="chat-container">
                <div className="row chat-nomination">
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
              <div className="item-container">
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
    },
    pauseDraft: () => {
      dispatch(pauseDraft())
    },
    resumeDraft: () => {
      dispatch(resumeDraft())
    },
    rollbackNomination: () => {
      dispatch(rollbackNomination())
    },
    leaveDraft: () => {
      dispatch(leaveDraft())
    }
  }
};

const mapStateToProps = (state) => {
    return state;
};

export default connect(mapStateToProps, mapDispatchToProps)(AuctionRoom);
