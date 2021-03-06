import React, { Component } from 'react';
import { connect } from 'react-redux';

import _ from 'lodash';

// style
import './style.scss';

import PlayerAvatar from '../../components/playerAvatar';
import Ticker from '../../components/ticker';
import * as bidderActions from '../../actions/bidders';

class ItemBox extends Component {

  componentDidUpdate(prevProps) {
    if (prevProps.bidderState.currentPlayerName !== this.props.bidderState.currentPlayerName || this.props.bidderState.currentBid !== prevProps.bidderState.currentBid) {
      const bidInputDiv = document.getElementById("bidInput");
      if (!this.props.bidderState.currentPlayerName) {
        bidInputDiv.value = 0;
      }
      else if (prevProps.bidderState.currentPlayerName !== this.props.bidderState.currentPlayerName) {
        bidInputDiv.value = (this.props.bidderState.currentBid + 1);
      }
      else if (prevProps.bidderState.currentBid !== this.props.bidderState.currentBid) {
        if (bidInputDiv.value <= this.props.bidderState.currentBid) {
          bidInputDiv.value = (this.props.bidderState.currentBid + 1);
        }
      }
    }
  }

  inputBid() {
    // no nominating if paused
    if (this.props.appState.paused) return;
    const bidderId = localStorage.getItem("bidderId");
    // if no player up for bid
    if (!this.props.bidderState.currentPlayerName) return;
    // if you have most recent bid
    if (this.props.bidderState.currentBidderId === bidderId) return;
    const bidAmount = document.getElementById('bidInput').value;
    if (!bidAmount) return;
    this.props.bidOnPlayer(Object.assign({}, {amount: parseInt(bidAmount, 10)}, {bidderId: bidderId}));
  }

  getPlayerByName(name) {
    return _.filter(this.props.playerState.players, function(o) {
      return o.name === name;
    })[0]
  }

  getBidderById(bidderId) {
    return _.filter(this.props.bidderState.bidders, function(o) {
      return o.bidderId === bidderId;
    })[0]
  }

  render() {
    if (!this.props.bidderState) return false;
    let playerDiv;
    let topBidderNameDiv;
    const bidderId = localStorage.getItem("bidderId");

    if (this.props.bidderState.currentPlayerName) {
      const player = this.getPlayerByName(this.props.bidderState.currentPlayerName);
      playerDiv = <PlayerAvatar player={player} />
      const topBidder = this.getBidderById(this.props.bidderState.currentBidderId);
      topBidderNameDiv = (
        <p className="top-bidder-name">{topBidder.name}</p>
      )
    } else {
      playerDiv = <PlayerAvatar player={{name: "Waiting for nomination", position: "N/A", bye: 0}} />
    }
    return (
      <div className="item-box">
        <div className="row">
          <div className="col-md-3">
            <Ticker />
          </div>
          <div className="col-md-3">
            {playerDiv}
          </div>
          <div className="col-md-3 price">
            {topBidderNameDiv}
            <h3>{"$" + (this.props.bidderState.currentBid ? this.props.bidderState.currentBid : '0')}</h3>
          </div>
          <div className="col-md-3 bid-input">
            <input id="bidInput" type="number" step="1" defaultValue={2}/>
            <div className={"btn bid-btn" + ((this.props.bidderState.currentPlayerName && this.props.bidderState.currentBidderId !== bidderId) ? " active" : "")} onClick={this.inputBid.bind(this)}>Place Bid</div>
          </div>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    bidOnPlayer: (bid) => {
      dispatch(bidderActions.placeBid(bid));
    },
  }
};

const mapStateToProps = (state) => {
    return state;
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemBox);
