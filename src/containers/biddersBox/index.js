import React, { Component } from 'react';
import { connect } from 'react-redux';

import './style.scss';

import BidderAvatar from '../../components/bidderAvatar';

import * as bidderActions from '../../actions/bidders';

class BidderBox extends Component {
  constructor(props) {
    super(props);
    this.requestedBidders = false;
  }
  componentWillMount() {
    if (!this.props.bidderState.biddersLoaded) {
      this.props.getBidders();
    }
  }

  render() {
    if (!this.props.bidderState || !this.props.bidderState.bidders) return false;
    const bidders = this.props.bidderState.bidders;
    let bidderAvatars = []

    for (var i=0; i < bidders.length; i++) {
      bidderAvatars.push(
        <BidderAvatar key={"bidder-avatar-" + i} bidder={bidders[i]} nominating={this.props.bidderState.currentBidderId === bidders[i].bidderId}/>
      )
    }

    return(
      <div className="bidder-box">
        <div className="row">
          { bidderAvatars }
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getBidders: () => {
      dispatch(bidderActions.fetchBidders());
    }
  }
};

const mapStateToProps = (state) => {
    return state;
};

export default connect(mapStateToProps, mapDispatchToProps)(BidderBox);
